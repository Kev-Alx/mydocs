<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index()
    {
        $publishedDocs = Document::query()->where("is_published", true)->get();
        return Inertia::render("Published", [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            "documents" => $publishedDocs,
        ]);
    }

    public function show(Document $document)
    {
        return Inertia::render('Dashboard', ['documents' => auth()->user()->documents()->get(), 'activeDoc' => $document]);
    }

    public function preview(Document $document)
    {
        // return $document;
        if ($document->is_published == 0) {
            return abort(404);
        }
        return Inertia::render('Preview', ['document' => $document]);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required',
            'is_folder' => "required",
            'is_published' => 'nullable',
        ]);
        $fields['user_id'] = auth()->id();
        $fields['document_id'] = $request->input('document_id');
        $fields['content'] = $request->input('content');
        Document::create($fields);

        return Redirect::back()->with(
            'documents',
            auth()->user()->documents()->get()
        );
    }

    public function update(Request $request, Document $document)
    {
        if ($document->user_id != auth()->id()) {
            abort(403, 'Unauthorized');
        }
        $fields = $request->validate([
            'title' => 'nullable',
            'is_folder' => "nullable",
            'is_published' => 'nullable',
            'content' => 'nullable',
        ]);
        $document->update($fields);
        return Redirect::back()->with(
            'documents',
            auth()->user()->documents()->get()
        );
    }

    public function destroy(Document $document)
    {
        if ($document->user_id != auth()->id()) {
            abort(403, 'Unauthorized');
        }
        $document->delete();
        return Redirect::route('dashboard')->with(
            'documents',
            auth()->user()->documents()->get()
        );
    }
}