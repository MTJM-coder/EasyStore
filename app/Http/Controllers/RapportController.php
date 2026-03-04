<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\RapportExport;
use App\Models\Produit;
use App\Models\MouvementStock;
use App\Models\commerce_abonnement;
use App\Models\Commerce;
use Carbon\Carbon;

class RapportController extends Controller
{
    //
    public function index()
    {
        $user = Auth::User();
        if ($user->role !== 'commerce') {
            return response()->json(['Message' => "Unhautorized"], 401);
        }
        return Inertia::render('Rapport');
    }


    public function createRapport(Request $req)
    {
        $user = Auth::user();
        $req->validate([
            'type'       => 'required|string',
            'date_debut' => 'nullable|date',
            'date_fin'   => 'nullable|date',
            'format'     => 'required|in:pdf,excel',
        ]);
        $type = $req->type;
        $date_debut = $req->date_debut ?? now()->startOfMonth();
        $date_fin = $req->date_fin ?? now();
        $format = $req->format;

        $data = $this->getData($user, $type, $date_debut, $date_fin);
        if ($format == 'pdf') {
            $pdf = Pdf::loadView('Rapports.rapport_pdf', [
                'commerce' => $user->commerce,
                'data' => $data,
                'type' => $type,
                'date_debut' => $date_debut,
                'date_fin' => $date_fin,
            ]);
            return $pdf->download("rapport_{$type}_{$date_debut}_au_{$date_fin}.pdf");
        }
        // return Excel::download(
        //         new RapportExport($data, $type), 
        //         "rapport_" . now()->format('Y-m-d') . ".xlsx"
        //     );
    }

    private function getData($user, $type, $date_debut, $date_fin)
    {

        $commerce_id = $user->commerce_id;
        return match ($type) {
            'Rapport du stock actuel' =>
            Produit::where('commerce_id', $commerce_id)
                ->get()
                ->map(fn($p) => [
                    'Référence'        => $p->ref,
                    'Produit'          => $p->name,
                    'Unité'            => $p->unit,
                    'Prix achat'       => $p->purchasing_price . ' FCFA',
                    'Prix vente'       => $p->selling_price . ' FCFA',
                    'Stock actuel'     => $p->current_quantity,
                    'Seuil'            => $p->seuil,
                    'Statut'           => $p->current_quantity == 0 ? 'Rupture' : ($p->current_quantity <= $p->seuil ? 'Sous seuil' : 'OK'),
                    'Ajouté le'        => \Carbon\Carbon::parse($p->created_at)->format('d/m/Y'),
                ]),

            'Rapport des entrées de stock' =>
            MouvementStock::whereHas('produit', fn($q) => $q->where('commerce_id', $commerce_id))
                ->where('type', 'in')
                ->whereBetween('date_mouvement', [$date_debut, $date_fin])
                ->with(['produit:id,name,ref', 'fournisseur:id,name', 'user:id,name'])
                ->get()
                ->map(fn($m) => [
                    'Date'         => \Carbon\Carbon::parse($m->date_mouvement)->format('d/m/Y H:i'),
                    'Produit'      => $m->produit->name ?? '-',
                    'Référence'    => $m->produit->ref ?? '-',
                    'Quantité'     => $m->quantity_change,
                    'Prix achat'   => $m->unit_price ? $m->unit_price . ' FCFA' : '-',
                    'Fournisseur'  => $m->fournisseur->name ?? '-',
                    'Enregistré par' => $m->user->name ?? '-',
                    'Note'         => $m->note ?? '-',
                ]),

            'Rapport des sorties de stock' =>
            MouvementStock::whereHas('produit', fn($q) => $q->where('commerce_id', $commerce_id))
                ->where('type', 'out')
                ->whereBetween('date_mouvement', [$date_debut, $date_fin])
                ->with(['produit:id,name,ref', 'user:id,name'])
                ->get()
                ->map(fn($m) => [
                    'Date'           => \Carbon\Carbon::parse($m->date_mouvement)->format('d/m/Y H:i'),
                    'Produit'        => $m->produit->name ?? '-',
                    'Référence'      => $m->produit->ref ?? '-',
                    'Motif'          => ucfirst($m->motif),
                    'Quantité'       => $m->quantity_change,
                    'Prix vente'     => $m->unit_price ? $m->unit_price . ' FCFA' : '-',
                    'Enregistré par' => $m->user->name ?? '-',
                    'Note'           => $m->note ?? '-',
                ]),

            'Rapport des mouvements de stock' =>
            MouvementStock::whereHas('produit', fn($q) => $q->where('commerce_id', $commerce_id))
                ->whereBetween('date_mouvement', [$date_debut, $date_fin])
                ->with(['produit:id,name,ref', 'user:id,name', 'fournisseur:id,name'])
                ->get()
                ->map(fn($m) => [
                    'Date'         => \Carbon\Carbon::parse($m->date_mouvement)->format('d/m/Y H:i'),
                    'Produit'      => $m->produit->name ?? '-',
                    'Référence'    => $m->produit->ref ?? '-',
                    'Type'         => $m->type === 'in' ? 'Entrée' : 'Sortie',
                    'Motif'        => ucfirst($m->motif),
                    'Quantité'     => $m->quantity_change,
                    'Prix unitaire' => $m->unit_price ? $m->unit_price . ' FCFA' : '-',
                    'Employé'      => $m->user->name ?? '-',
                    'Fournisseur'  => $m->fournisseur->name ?? '-',
                    'Note'         => $m->note ?? '-',
                ]),

            'Rapport des produits sous seuil' =>
            Produit::where('commerce_id', $commerce_id)
                ->whereColumn('current_quantity', '<=', 'seuil')
                ->get()
                ->map(fn($p) => [
                    'Référence'    => $p->ref,
                    'Produit'      => $p->name,
                    'Stock actuel' => $p->current_quantity,
                    'Seuil'        => $p->seuil,
                    'Manquant'     => $p->seuil - $p->current_quantity,
                    'Statut'       => $p->current_quantity == 0 ? '🔴 Rupture' : '🟡 Sous seuil',
                ]),

            'Rapport de valeur estimative du stock' =>
            Produit::where('commerce_id', $commerce_id)
                ->selectRaw('*, (current_quantity * purchasing_price) as valeur_totale')
                ->get()
                ->map(fn($p) => [
                    'Référence'       => $p->ref,
                    'Produit'         => $p->name,
                    'Stock actuel'    => $p->current_quantity,
                    'Prix achat'      => $p->purchasing_price . ' FCFA',
                    'Valeur en stock' => ($p->current_quantity * $p->purchasing_price) . ' FCFA',
                ]),

            default => collect()
        };
    }
}
