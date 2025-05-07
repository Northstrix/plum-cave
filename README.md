# Plum Cave
A cloud backup solution that employs the "ChaCha20 + Serpent-256 CBC + HMAC-SHA3-512" authenticated encryption scheme for data encryption and ML-KEM-1024 for quantum-resistant key exchange.

Check it out at https://plum-cave.netlify.app/

SourceForge page: https://sourceforge.net/projects/plum-cave/

ChaCha20 + Twofish-256 CBC + HMAC-SHA3-512 Version: https://sourceforge.net/projects/plum-cave-twofish/

The account password can contain non-ASCII characters!

The app is fully localized into:

✓ English

✓ Hebrew

✓ Argentinian Spanish

![Hovered element in the desktop features section](https://github.com/Northstrix/plum-cave/blob/main/screenshots/web-app/hovered-client-side-encryption-rectangle-in-desktop-features-section.png?raw=true)

![Web app dashboard 2560px](https://github.com/Northstrix/plum-cave/blob/main/screenshots/web-app/dashboard.png?raw=true)

![Web app dashboard 1322px](https://github.com/Northstrix/plum-cave/blob/main/screenshots/web-app/dashboard-1322px.png?raw=true)

![Python script overview](https://github.com/Northstrix/plum-cave/blob/main/screenshots/python-script/python-script-overview.png?raw=true)

# Firestore Rules
    
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
    
        // === 1. /data/{userEmail}/backups, limit to 10 backups ===
        match /data/{userEmail}/backups/{backupId} {
          allow get, list: if resource.data.isPublic == true
                           || (request.auth != null && request.auth.token.email == userEmail);
    
          allow update: if resource.data.isPublic == true
            && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['downloads'])
            && request.resource.data.downloads == resource.data.downloads + 1;
    
          allow create: if request.auth != null
            && request.auth.token.email == userEmail
            && (
              !exists(/databases/$(database)/documents/data/$(userEmail)/backups)
              || get(/databases/$(database)/documents/data/$(userEmail)/backups).list().size() < 10
            );
          allow update, delete: if request.auth != null && request.auth.token.email == userEmail;
        }
    
        // === 1b. Allow owner full access to all subcollections and docs under each backup ===
        match /data/{userEmail}/backups/{backupId}/{document=**} {
          allow read, write, delete: if request.auth != null && request.auth.token.email == userEmail;
          allow get, list: if exists(/databases/$(database)/documents/data/$(userEmail)/backups/$(backupId))
            && get(/databases/$(database)/documents/data/$(userEmail)/backups/$(backupId)).data.isPublic == true;
        }
    
        // === 2. /data/{userEmail}/receivedBackups/{document=**} ===
        match /data/{userEmail}/receivedBackups/{document=**} {
          allow write: if request.auth != null; // Any authenticated user can write
          allow read, delete: if request.auth != null && request.auth.token.email == userEmail; // Only owner can read/delete
        }
    
        // === 3. /data/{userEmail}/public/{document=**} ===
        match /data/{userEmail}/public/{document=**} {
          allow read: if true; // Anyone (even unauthenticated) can read
          allow write, delete: if request.auth != null && request.auth.token.email == userEmail; // Only owner can write/delete
        }
    
        // === 4. /data/{userEmail}/private/encrypted/projectInfo, limit to 2 folders ===
        match /data/{userEmail}/private/encrypted/projectInfo/{projectId} {
          allow create: if request.auth != null && request.auth.token.email == userEmail
            && (
              !exists(/databases/$(database)/documents/data/$(userEmail)/private/encrypted/projectInfo)
              || get(/databases/$(database)/documents/data/$(userEmail)/private/encrypted/projectInfo).list().size() < 2
            );
          allow read, update, delete: if request.auth != null && request.auth.token.email == userEmail;
        }
    
        // === 5. /data/{userEmail}/private/encrypted/projectInfo/{projectId}/backups, limit to 5 per project ===
        match /data/{userEmail}/private/encrypted/projectInfo/{projectId}/backups/{backupId} {
          allow create: if request.auth != null && request.auth.token.email == userEmail
            && (
              !exists(/databases/$(database)/documents/data/$(userEmail)/private/encrypted/projectInfo/$(projectId)/backups)
              || get(/databases/$(database)/documents/data/$(userEmail)/private/encrypted/projectInfo/$(projectId)/backups).list().size() < 5
            );
          allow read, update, delete: if request.auth != null && request.auth.token.email == userEmail;
        }
    
        // === 6. /data/{userEmail}/private/{document=**} ===
        match /data/{userEmail}/private/{document=**} {
          allow read, write, delete: if request.auth != null && request.auth.token.email == userEmail;
        }
    
        // === 7. /data/{userEmail}/private root ===
        match /data/{userEmail}/private {
          allow read: if request.auth != null;
          allow write, delete: if request.auth != null && request.auth.token.email == userEmail;
        }
    
        // === 8. Default deny ===
        match /{document=**} {
          allow read, write, delete: if false;
        }
      }
    }

# Adjusting/Removing Limitations

Firestore rules are easy to edit, especially using AI tools like [Perplexity](https://www.perplexity.ai/) or [Mistral's Le Chat](https://chat.mistral.ai/chat), so I'll only explain how to remove the in-app-enforced limitations.

---

**Adjusting Project Limit**  
To modify maximum allowed projects per user:  
1. find `if (projectsSnapshot.size >= 2) {` line in `Dashboard.tsx` file
2. Replace `2` with your desired limit  
3. **To remove the project limit entirely**:  
   - Delete the entire `if` block  
   - Remove its corresponding `else` statement wrapper  
   - Retain internal code  
   - Delete closing `}` for the block  

---

**Modifying Backup Limits**  
To adjust maximum allowed backups per project:  
1. Find `if (backupsSnapshot.size >= 5) {` line in `Dashboard.tsx` file
2. Change `5` to preferred threshold  
3. **To eliminate the backup limit**: Remove the entire conditional block (

          if (backupsSnapshot.size >= 5) {
            const errorMessage = `
              <p style="margin-bottom: 10px;" dir="${isRTL ? 'rtl' : 'ltr'}">${t('backup_limit_reached_message')}</p>
              <p dir="${isRTL ? 'rtl' : 'ltr'}">${t('delete_backup_to_add_new')}</p>`;
            showErrorModal(errorMessage);
            return;
          }

# Setting Up the App

To run the app with your own Firebase instance:

1) Create a web app in Firebase

2) Copy the database access credentials and paste them into app/lib/firebase.ts, replacing the mock-up credentials

3) Enable the "Authentication" and "Firestore Database" services

4) Configure Firestore Database rules

5) Compile the web app

6) Host the statically-compiled app on [Netlify](https://www.netlify.com/) or any hosting of your choice


# Credit

The existence of this project (at least in its current form) wouldn't've been possible without the following:

### Web App

[View transitions - Demo](https://codepen.io/stefanjudis/pen/ByBbNGQ) by [Stefan Judis](https://codepen.io/stefanjudis)

[Toolbars With Sliding Selection](https://codepen.io/jkantner/pen/OJKZxpv) by [Jon Kantner](https://codepen.io/jkantner)

[Gsap Slider](https://codepen.io/yudizsolutions/pen/YzgXvZJ) by [Yudiz Solutions Limited](https://codepen.io/yudizsolutions)

[BUTTONS](https://codepen.io/uchihaclan/pen/NWOyRWy) by [TAYLOR](https://codepen.io/uchihaclan)

[glowy hover](https://codepen.io/inescodes/pen/PoxMyvX) effect by [Ines](https://codepen.io/inescodes)

[Counter](https://animata.design/docs/text/counter) by [ANIMATA](https://animata.design/)

[Spotlight Card](https://hextaui.com/docs/animation/spotlight-card) by [HextaUI](https://hextaui.com/)

[Free Security Animation](https://lottiefiles.com/free-animation/security-u7W7BaP6gT) by [DE GUZMAN, Jalei](https://lottiefiles.com/7jj0km154m2utqnk)

[Free Lock-Key_Animation Animation](https://lottiefiles.com/free-animation/lock-key-animation-uxf8dq5CHo) by [Abdul Latif](https://lottiefiles.com/animoox)

[Free Uploading to cloud Animation](https://lottiefiles.com/free-animation/uploading-to-cloud-VWQJD1A1A0) by [Nazar](https://lottiefiles.com/colorstreak)

[Free Share icon waiting Animation](https://lottiefiles.com/free-animation/share-icon-waiting-XFgEc5GoTG) by [jjjoven](https://lottiefiles.com/jjjoven)

[Text scroll and hover effect with GSAP and clip](https://codepen.io/Juxtopposed/pen/mdQaNbG) by [Juxtopposed](https://codepen.io/Juxtopposed)

[tabler-icons](https://github.com/tabler/tabler-icons) by [tabler](https://github.com/tabler)

[lucide](https://github.com/lucide-icons/lucide) by [lucide-icons](https://github.com/lucide-icons)

[react-toastify](https://github.com/fkhadra/react-toastify) by [Fadi Khadra](https://github.com/fkhadra)

[sweetalert2](https://github.com/sweetalert2/sweetalert2) by [sweetalert2](https://github.com/sweetalert2)

[react-i18next](https://github.com/i18next/react-i18next) by [i18next](https://github.com/i18next)

[hash-wasm](https://github.com/Daninet/hash-wasm) by [Daninet](https://github.com/Daninet)

[firebase-js-sdk](https://github.com/firebase/firebase-js-sdk) by [firebase](https://github.com/firebase/firebase-js-sdk)

[mipher](https://github.com/mpaland/mipher) by [mpaland](https://github.com/mpaland)

[crystals-kyber-js](https://github.com/dajiaji/crystals-kyber-js) by [dajiaji](https://github.com/dajiaji)

[File Upload](https://ui.aceternity.com/components/file-upload) by [Aceternity UI](https://ui.aceternity.com/)

[Balatro](https://www.reactbits.dev/backgrounds/balatro) by [React Bits](https://www.reactbits.dev/)

[Animated Tooltip](https://ui.aceternity.com/components/animated-tooltip) by [Aceternity UI](https://ui.aceternity.com/)

[Custom Progress Bar](https://codepen.io/FlorinPop17/pen/yLyzmLZ) by [Florin Pop](https://codepen.io/FlorinPop17)

[すりガラスなプロフィールカード](https://codepen.io/ash_creator/pen/zYaPZLB) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[Signup Form](https://ui.aceternity.com/components/signup-form) from [Aceternity UI](https://ui.aceternity.com/)

[CSS table](https://codepen.io/ajlohman/pen/GRWYWw) by [Andrew Lohman](https://codepen.io/ajlohman)

[motion](https://github.com/motiondivision/motion) by [motiondivision](https://github.com/motiondivision)

[GSAP](https://github.com/greensock/GSAP) by [greensock](https://github.com/greensock)

[ogl](https://github.com/oframe/ogl) by [oframe](https://github.com/oframe)

[Bouncing Cube Loader](https://codepen.io/haja-ran/pen/xxWRKNm) by [Haja Randriakoto](https://codepen.io/haja-ran)

[JTB studios - Link](https://codepen.io/zzznicob/pen/GRPgKLM) by [Nico](https://codepen.io/zzznicob)

[Perplexity](https://www.perplexity.ai/)

[Mistral's Le Chat](https://chat.mistral.ai/chat)

Used [Namer UI](https://namer-ui.netlify.app/) components:

- Halomot Button

- Fancy Hero Section

- Pricing Card

- Fancy Navbar

- Dreamy Input

- Structured Block

- Unfolding Sidebar

- Random Number Generator

- File Encrypter

### Python Script

[Replit Agent](https://replit.com/~)

[Perplexity](https://www.perplexity.ai/)

[Mistral's Le Chat](https://chat.mistral.ai/chat)
