// src/utils/googleDriveUploader.js
const CLIENT_ID = '111992512108-n4avtbse5dqjhv28btj4nfphfsga1kkm.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

let isGapiLoaded = false;
let isGapiInitialized = false;

async function loadGapi() {
  if (!isGapiLoaded) {
    await new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = resolve;
      document.body.appendChild(script);
    });
    isGapiLoaded = true;
  }

  return new Promise((resolve) => {
    window.gapi.load('client:auth2', resolve);
  });
}

async function initAuth() {
  const existingAuth = window.gapi.auth2.getAuthInstance();
  if (existingAuth) {
    return existingAuth;
  }

  await window.gapi.client.init({
    clientId: CLIENT_ID,
    scope: SCOPES,
  });

  return window.gapi.auth2.getAuthInstance();
}

export async function uploadToGoogleDrive(file, role) {
  await loadGapi();

  const auth = await initAuth();

  if (!auth.isSignedIn.get()) {
    await auth.signIn();
  }

  const accessToken = auth.currentUser.get().getAuthResponse().access_token;

  const metadata = {
    name: `${role}-${file.name}`,
    mimeType: file.type,
    // parents: ['your-folder-id-based-on-role'], // optional
  };

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );
  form.append('file', file);

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink',
    {
      method: 'POST',
      headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
      body: form,
    }
  );

  if (!response.ok) {
    throw new Error('Upload failed: ' + (await response.text()));
  }

  return await response.json(); // { id, webViewLink }
}
