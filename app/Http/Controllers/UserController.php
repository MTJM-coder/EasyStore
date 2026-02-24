<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;



class UserController extends Controller
{
    //
    public function getUsers(){
        try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return Response()->json([401,'Message'=>$e->getMessage()]);
        }

        $users= User::all();
        dd($user);
        return response()->json([200,'Message'=>'ok users found sucessfully','users'=>$users]);

    }

    public function getUser($id){
        try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return Response()->json([401,'Message'=>$e->getMessage()]);
        }

        if($user->role!=='admin'){
            return Response()->json(["Message"=>"Unauthorized"],403);
        }

        $user=User::find($id);
        if($user){
            return Response()->json(["Message"=>"User found successfully", 'data'=>$user],200);
        }
        else{
            return Response()->json(["Message"=>"User not found"],404);
        }


    }

    public function createUser(Request $req){
        try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return Response()->json(["Message"=>$e->getMessage()],401);
        }
        if($user->role!=='admin'){
            return Response()->json(["Message"=>"Unauthorized"],403);
        }
        
        $validateData=$req->validate([
            'name'=>'required',
            'email'=>'required|unique:users',
            'password'=>'required|confirmed',
            'telephone'=>'required|unique:users',
            'role'=>'required|in:admin,commerce',
        ]);
        $user=new User();
        $user->name=$validateData['name'];
        $user->email=$validateData['email'];
        $user->password=Hash::make($validateData['password']);
        $user->telephone=$validateData['telephone'];
        $user->role=$validateData['role'];
        $user->actif=true;
        $user->save();
        

        return Response()->json(["Message"=>"User created successfully", 'data'=>$user],201);

    }

       public  function updateUser(Request $req, $id){
            try{
                $user=Auth::user();
            }
            catch(Exception $e){
                return Response()->json(["Message"=>$e->getMessage()],401);
            }
            if($user->role!=='admin'){
                return Response()->json(["Message"=>"Unauthorized"],403);
            }
            
            $validateData=$req->validate([
                'name'=>'required',
                'email'=>'required|unique:users,email,'.$id,
                'telephone'=>'required|unique:users,telephone,'.$id,
                'role'=>'required|in:admin,commerce',
            ]);
            $user=User::find($id);
            if(!$user){
                return Response()->json(["Message"=>"User not found"],404);
            }
            $user->name=$validateData['name'];
            $user->email=$validateData['email'];
            $user->telephone=$validateData['telephone'];
            $user->role=$validateData['role'];
            $user->save();
            
    
            return Response()->json(["Message"=>"User updated successfully", 'data'=>$user],200);
    }

    public function deleteUser($id){
        try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return Response()->json(["Message"=>$e->getMessage()],401);
        }
        if($user->role!=='admin'){
            return Response()->json(["Message"=>"Unauthorized"],403);
        }
        $user=User::find($id);
        if(!$user){
            return Response()->json(["Message"=>"User not found"],404);
        }
        $user->delete();
        return Response()->json(["Message"=>"User deleted successfully"],200);

       
    }
}
