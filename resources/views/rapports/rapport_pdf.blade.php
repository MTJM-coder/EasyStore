<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
        }

        h1 {
            color: #7c3aed;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th {
            background: #7c3aed;
            color: white;
            padding: 8px;
            text-align: left;
        }

        td {
            padding: 8px;
            border-bottom: 1px solid #e5e7eb;
        }

        tr:nth-child(even) {
            background: #f9fafb;
        }

        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>EasyStore — {{ $type }}</h1>
        <p>Commerce : {{ $commerce->name }}<br>
            Période : {{ $date_debut }} au {{ $date_fin }}</p>
    </div>

    @if($data->isEmpty())
    <p>Aucune donnée pour cette période.</p>
    @else
    <table>
        <thead>
            <tr>
                @foreach(array_keys($data->first()) as $col)
                <th>{{ $col }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach($data as $row)
            <tr>
                @foreach($row as $val)
                <td>{{ is_array($val) ? implode(', ', $val) : $val }}</td>
                @endforeach
            </tr>
            @endforeach
        </tbody>
    </table>
    @endif
</body>

</html>