<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Abonnement;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\commerce_abonnement;
class AbonnementController extends Controller
{
    //
    public function getAbonnements(){
        $user=Auth::user();
        if($user->role!=="admin"){
            return Response()->json(["Message"=>"unauthorized"],403);
        }
        $abonnements=Abonnement::all();
        return Response()->json(["abonnements"=>$abonnements],200);
    }

    public function getAbonnement($id){
        $user=Auth::user();
        if($user->role!=="admin"){
            return Response()->json(["Message"=>"unauthorized"],403);
        }
        $abonnement=Abonnement::find($id);
        if(!$abonnement){
            return Response()->json(["Message"=>"Abonnement not found"],404);
        }
        return Response()->json(["abonnement"=>$abonnement],200);
    }

        public function getAbonnementsCommerce(){
            $user=Auth::user();
            if($user->role!=="commerce"){
                return Response()->json(["Message"=>"unauthorized"],403);
            }
            $abonnements=Abonnement::all();
            $abonnementActuel=commerce_abonnement::where('commerce_id',$user->commerce_id)->where('status','actif')->with('abonnement')->first();
            $historiqueAbonnement=Commerce_abonnement::where('commerce_id',$user->commerce_id)->with('abonnement')->get();
            return Inertia::render('MonAbonnement',[
                'abonnements'=>$abonnements,
                'abonnementActuel'=>$abonnementActuel,
                'historiqueAbonnement'=>$historiqueAbonnement
            ]);
        }

    public function addAbonnement(Request $req){
        $validatedata=$req->validate([
            "name"=>"required",
            "price"=>"required|numeric",
            "description"=>"nullable",
            "duration"=>"required|integer",
            "max_produits"=>"integer",
            "max_users"=>"integer",
            "export_pdf"=>"boolean",
            "rapports_avances"=>"boolean",
            "multi_boutique"=>"boolean"
        ]);
        $user=Auth::user();
        if($user->role!=="admin"){
            return Response()->json(["Message"=>"unauthorized"],403);
        }
        $abonnement=new Abonnement();
        $abonnement->name=$validatedata['name'];
        $abonnement->price=$validatedata['price'];
        $abonnement->description=$validatedata['description'] ?? null;
        $abonnement->duration=$validatedata['duration'];
        $abonnement->max_produits=$validatedata['max_produits'] ?? 50;
        $abonnement->max_users=$validatedata['max_users'] ?? 1;
        $abonnement->export_pdf=$validatedata['export_pdf'] ?? false;
        $abonnement->rapports_avances=$validatedata['rapports_avances'] ?? false;
        $abonnement->multi_boutique=$validatedata['multi_boutique'] ?? false;
        $abonnement->save();

        return Response()->json(["Message"=>"Abonnement created successfully","abonnement"=>$abonnement],200);
    }

     public function updateAbonnement(Request $req,$id){
         $abonnement=Abonnement::find($id);
         if(!$abonnement){
             return Response()->json(["Message"=>"Abonnement not found"],404);
         }
            $validatedata=$req->validate([
                "name"=>"required",
                "price"=>"required|numeric",
                "description"=>"nullable",
                "duration"=>"required|integer",
                "max_produits"=>"integer",
                "max_users"=>"integer",
                "export_pdf"=>"boolean",
                "rapports_avances"=>"boolean",
                "multi_boutique"=>"boolean"
            ]);
            $user=Auth::user();
            if($user->role!=="admin"){
                return Response()->json(["Message"=>"unauthorized"],403);
            }
            $abonnement->name=$validatedata['name'];
            $abonnement->price=$validatedata['price'];
            $abonnement->description=$validatedata['description'] ?? null;
            $abonnement->duration=$validatedata['duration'];
            $abonnement->max_produits=$validatedata['max_produits'] ?? 50;
            $abonnement->max_users=$validatedata['max_users'] ?? 1;
            $abonnement->export_pdf=$validatedata['export_pdf'] ?? false;
            $abonnement->rapports_avances=$validatedata['rapports_avances'] ?? false;
            $abonnement->multi_boutique=$validatedata['multi_boutique'] ?? false;
            $abonnement->save();   
            return Response()->json(["Message"=>"Abonnement updated successfully","abonnement"=>$abonnement],200);
     }

     public function deleteAbonnement($id){
         $user=Auth::user();
         if($user->role!=="admin"){
             return Response()->json(["Message"=>"unauthorized"],403);
         }
         $abonnement=Abonnement::find($id);
         if(!$abonnement){
             return Response()->json(["Message"=>"Abonnement not found"],404);
         }
         $abonnement->delete();
         return Response()->json(["Message"=>"Abonnement deleted successfully"],200);
     }
}
