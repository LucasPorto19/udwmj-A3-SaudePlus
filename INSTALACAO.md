# 🚀 Guia Rápido de Instalação - Saúde +

## Passo a Passo Rápido

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto
3. Ative **Authentication** (Email/Password)
4. Ative **Firestore Database**
5. Copie as credenciais e cole em `src/config/firebase.js`

### 3. Configurar Firestore Rules

No Firebase Console, vá em **Firestore Database > Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.type == 'admin');
    }
    match /history/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 4. Criar Usuário Admin

1. Registre-se normalmente no sistema
2. No Firestore, edite o documento em `users/{seu-user-id}`
3. Altere `type` de `"paciente"` para `"admin"`

### 5. Executar o Projeto

```bash
npm run dev
```

Acesse: http://localhost:5173

## ✅ Pronto!

Agora você pode:
- Criar contas de pacientes
- Agendar consultas
- Ver histórico
- Acessar painel admin (após configurar usuário admin)

## 📚 Documentação Completa

Veja o arquivo `README.md` para mais detalhes.

