<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/upload', function(Request $request) {
	$file = $request->file('document');
	$mimetype = $file->getClientMimeType();
	$extension = $file->getClientOriginalExtension();
	$uploadedFile = time() . '.' . $extension;
	$path = Storage::putFileAs('public', $file, $uploadedFile);
	$httpPath = url("/storage/{$uploadedFile}");
	if(preg_match('/(doc|word|ms|rtf)/', $mimetype)) {
		$httpPath = "https://docs.google.com/gview?url={$httpPath}&embedded=true";
	}
	
	return [
		'file' => $uploadedFile,
		'mimetype' => $mimetype,
		'path' => $httpPath,
	];
});