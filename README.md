# Saúde + 🏥

Plataforma web responsiva para agendamento de consultas e gestão de saúde, desenvolvida para contribuir com a **ODS 3 - Saúde e Bem-Estar** da ONU.

## 📋 Objetivo

Criar uma plataforma digital acessível que facilite o agendamento de consultas médicas, controle de histórico médico e gestão de saúde pública, promovendo acesso universal à saúde.

## 🚀 Tecnologias Utilizadas

- **Vue.js 3** - Framework JavaScript reativo
- **Vite** - Build tool e dev server
- **Vue Router** - Roteamento
- **Pinia** - Gerenciamento de estado
- **Firebase Authentication** - Autenticação de usuários
- **Firebase Firestore** - Banco de dados NoSQL
- **Tailwind CSS** - Framework CSS utilitário
- **Chart.js** - Gráficos e visualizações
- **jsPDF** - Geração de relatórios PDF

## 📁 Estrutura do Projeto

```
saude-plus/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── HeaderNav.vue
│   │   ├── FooterBar.vue
│   │   ├── ButtonPrimary.vue
│   │   ├── InputField.vue
│   │   └── AppointmentCard.vue
│   ├── pages/               # Páginas da aplicação
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── Register.vue
│   │   ├── DashboardUser.vue
│   │   ├── AgendarConsulta.vue
│   │   ├── Historico.vue
│   │   └── PainelAdmin.vue
│   ├── stores/              # Stores Pinia
│   │   └── auth.js
│   ├── router/              # Configuração de rotas
│   │   └── index.js
│   ├── config/              # Configurações
│   │   └── firebase.js
│   ├── utils/               # Utilitários
│   │   └── notifications.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

- Node.js 16+ instalado
- Conta no Firebase (https://firebase.google.com)
- NPM ou Yarn

### Passo 1: Instalar Dependências

```bash
npm install
```

### Passo 2: Configurar Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com)
2. Crie um novo projeto ou use um existente
3. Ative os seguintes serviços:
   - **Authentication** (Email/Password)
   - **Firestore Database**
   - **Cloud Messaging** (opcional, para notificações push)

4. Copie as credenciais do Firebase e cole no arquivo `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB7UlHYhLuDzRKIvy-TATNaUW2sVB036yw",
  authDomain: "saude-plus-aee97.firebaseapp.com",
  projectId: "saude-plus-aee97",
  storageBucket: "saude-plus-aee97.firebasestorage.app",
  messagingSenderId: "957852499782",
  appId: "1:957852499782:web:f8d4078f5a24ae1a6faf47",
  measurementId: "G-637WCJLBEN"
};
```

### Passo 3: Configurar Firestore Rules

No console do Firebase, vá em **Firestore Database > Rules** e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler/escrever seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Consultas: usuários podem gerenciar suas próprias
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.type == 'admin');
    }
    
    // Histórico: apenas o próprio usuário
    match /history/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Passo 4: Criar Usuário Administrador

Para criar um usuário administrador, após fazer o primeiro registro, vá ao Firestore e edite o documento do usuário em `users/{userId}`, alterando o campo `type` de `"paciente"` para `"admin"`.

### Passo 5: Executar o Projeto

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 👤 Como Acessar

### Como Paciente

1. Acesse a página inicial
2. Clique em **"Criar Conta"**
3. Preencha o formulário de registro
4. Faça login com suas credenciais
5. Acesse o Dashboard e comece a agendar consultas!

### Como Administrador

1. Crie uma conta normalmente
2. No Firestore, altere o campo `type` do seu usuário para `"admin"`
3. Faça login novamente
4. Acesse o **Painel Admin** pelo menu de navegação

## 🎯 Funcionalidades

### 👤 Usuário Paciente

- ✅ Cadastro e login seguro
- ✅ Edição de perfil
- ✅ Agendamento de consultas (especialidade, unidade, data, lembrete)
- ✅ Visualização de agenda médica
- ✅ Atualização de status de consulta (Realizada / Não Compareceu)
- ✅ Histórico médico completo
- ✅ Dashboard com resumo de consultas

### 🏥 Administrador

- ✅ Painel administrativo completo
- ✅ Estatísticas gerais (total de consultas, pacientes, etc.)
- ✅ Gráficos de atendimentos (Chart.js)
- ✅ Lista de pacientes cadastrados
- ✅ Geração de relatórios PDF
- ✅ Taxa de comparecimento

## 🔔 Notificações

O sistema está preparado para notificações, mas requer configuração adicional:

- **Firebase Cloud Messaging (FCM)** - Para notificações push
- **Firebase Extensions** - Para envio de e-mails automáticos

Veja o arquivo `src/utils/notifications.js` para implementação.

## 🎨 Design e Acessibilidade

- **Cores principais**: Azul-claro (#4DA6FF) e branco
- **Tipografia**: Inter (Google Fonts)
- **Layout**: Mobile First, totalmente responsivo
- **Acessibilidade**: Foco em usuários idosos e baixa visão
- **UX**: Interface simples e intuitiva

## 📊 Estrutura do Banco de Dados

### Collection: `users`
```javascript
{
  name: string,
  email: string,
  type: "admin" | "paciente",
  createdAt: timestamp
}
```

### Collection: `appointments`
```javascript
{
  userId: string,
  unidade: string,
  especialidade: string,
  date: timestamp,
  lembrete: string,
  status: "agendado" | "concluído" | "faltou",
  createdAt: timestamp
}
```

### Collection: `history`
```javascript
{
  consultasRealizadas: number,
  consultasCanceladas: number,
  ultimosAtendimentos: array
}
```

## 🧪 Testes

Para testar o sistema:

1. **Cadastro**: Crie uma conta de paciente
2. **Login**: Faça login com as credenciais
3. **Agendamento**: Agende uma consulta
4. **Histórico**: Verifique o histórico
5. **Status**: Atualize o status de uma consulta
6. **Admin**: Acesse como administrador e veja os relatórios

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🎓 Objetivo Educacional

Este projeto foi desenvolvido com foco educacional, sendo:
- **Organizado**: Código limpo e bem estruturado
- **Comentado**: Comentários explicativos para iniciantes
- **Modularizado**: Componentes reutilizáveis
- **Fácil de expandir**: Arquitetura preparada para crescimento

## 🌍 ODS 3 - Saúde e Bem-Estar

Este projeto contribui para o Objetivo de Desenvolvimento Sustentável 3 da ONU, promovendo:
- Acesso universal à saúde
- Melhoria na qualidade de vida
- Redução de barreiras ao atendimento médico
- Gestão eficiente de recursos de saúde

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório do projeto.

---

**Desenvolvido com ❤️ para promover saúde e bem-estar para todos**

