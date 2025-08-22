# 🚀 Academia Mercado Local Caldas

Sistema completo de academia online con integración de Bunny Stream para mercadolocal.co

## ✨ Características

- 🎬 **Streaming de video** con Bunny Stream
- 📚 **Sistema de cursos** completo con lecciones
- 📊 **Tracking de progreso** automático  
- 💾 **Base de datos PostgreSQL** con Prisma
- 🎨 **UI responsive** con Tailwind CSS
- 🔐 **Sistema de autenticación** con Clerk
- 📱 **APIs RESTful** para gestión completa

## 🏗️ Infraestructura

- **Framework:** Next.js 15.3.5
- **Base de datos:** PostgreSQL 15.14 (Docker)
- **Streaming:** Bunny Stream (Library: 476857)
- **Deploy:** PM2 + Nginx en VPS Hostinger
- **Dominio:** https://mercadolocal.co

## 🚀 Deploy

```bash
git clone https://github.com/juanchorojasb/caldas.git
cd caldas
npm install
npm run build
pm2 start ecosystem.config.js
```

## 📊 Estado Actual

✅ **Funcionando:** https://mercadolocal.co/academia  
🎬 **Video ejemplo:** Integrado con Bunny Stream  
📱 **Responsive:** Optimizado para móvil y desktop

## 📚 Documentación

Ver `DEPLOY_GUIDE.md` para guía completa de deploy y configuración.
