#!/bin/bash

# 🎯 SCRIPT FINAL: CORRECCIÓN DURACIÓN PROGRAMA ACADEMIA CALDAS
# Cambiar todas las referencias de "6 meses" a "2 meses"

echo "🔧 ACADEMIA MERCADO LOCAL CALDAS - CORRECCIÓN DE DURACIÓN"
echo "========================================================="
echo "📅 Cambio: 6 meses → 2 meses"
echo "📍 Características: Acceso libre, voluntario y comprometido"
echo ""

# Navegar al directorio correcto
cd /var/www/caldas/caldas || {
    echo "❌ Error: No se pudo acceder al directorio del proyecto"
    exit 1
}

echo "📁 Directorio actual: $(pwd)"

# PASO 1: Crear backup de seguridad
backup_dir="backup_correccion_$(date +%Y%m%d_%H%M%S)"
echo "📦 Creando backup en: $backup_dir"
mkdir -p "$backup_dir"

# PASO 2: Listar archivos a procesar
files_to_process=(
    "app/page.tsx"
    "app/auth/register/page.tsx"
    "app/dashboard/page.tsx"
    "app/dashboard/profile/page.tsx"
    "components/RegistrationForm.tsx"
    "components/ui/registration-form.tsx"
    "components/ui/forms.tsx"
    "lib/constants.ts"
    "lib/config.ts"
    "README.md"
)

# PASO 3: Mostrar estado actual
echo -e "\n🔍 VERIFICANDO ESTADO ACTUAL..."
found_references=false

for file in "${files_to_process[@]}"; do
    if [ -f "$file" ]; then
        matches=$(grep -n "6.*mes\|seis.*mes" "$file" 2>/dev/null || true)
        if [ ! -z "$matches" ]; then
            echo "📍 ENCONTRADO EN $file:"
            echo "$matches"
            echo ""
            found_references=true
        fi
    fi
done

if [ "$found_references" = false ]; then
    echo "✅ No se encontraron referencias a '6 meses' en archivos conocidos"
    echo "🔍 Buscando en todo el proyecto..."
    
    all_matches=$(grep -r -n "6.*mes\|seis.*mes" . --include="*.tsx" --include="*.ts" --include="*.js" --include="*.jsx" 2>/dev/null || true)
    if [ ! -z "$all_matches" ]; then
        echo "📍 REFERENCIAS ENCONTRADAS:"
        echo "$all_matches"
        found_references=true
    else
        echo "✅ No se encontraron referencias a '6 meses' en todo el proyecto"
        echo "ℹ️  Posiblemente ya fueron corregidas anteriormente"
    fi
fi

# PASO 4: Función de reemplazo
perform_replacements() {
    local file=$1
    echo "📝 Procesando: $file"
    
    # Crear backup del archivo
    cp "$file" "$backup_dir/"
    
    # Realizar todos los reemplazos
    sed -i 's/6 meses/2 meses/g' "$file"
    sed -i 's/6-meses/2-meses/g' "$file"
    sed -i 's/seis meses/dos meses/g' "$file"
    sed -i 's/SEIS MESES/DOS MESES/g' "$file"
    sed -i 's/Seis Meses/Dos Meses/g' "$file"
    sed -i 's/6 mes/2 mes/g' "$file"
    sed -i 's/programa de 6 meses/programa de 2 meses/g' "$file"
    sed -i 's/formación de 6 meses/formación de 2 meses/g' "$file"
    sed -i 's/curso de 6 meses/curso de 2 meses/g' "$file"
    sed -i 's/duración: 6 meses/duración: 2 meses/g' "$file"
    sed -i 's/durante 6 meses/durante 2 meses/g' "$file"
    sed -i 's/por 6 meses/por 2 meses/g' "$file"
    sed -i 's/de 6 meses/de 2 meses/g' "$file"
    sed -i 's/6 months/2 months/g' "$file"
    
    echo "  ✅ Reemplazos completados"
}

# PASO 5: Ejecutar correcciones si se encontraron referencias
if [ "$found_references" = true ]; then
    echo -e "\n❓ ¿Proceder con las correcciones? (y/N): "
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo -e "\n🔄 APLICANDO CORRECCIONES..."
        
        for file in "${files_to_process[@]}"; do
            if [ -f "$file" ]; then
                matches=$(grep -n "6.*mes\|seis.*mes" "$file" 2>/dev/null || true)
                if [ ! -z "$matches" ]; then
                    perform_replacements "$file"
                fi
            fi
        done
        
        # También procesar cualquier archivo adicional encontrado
        additional_files=$(grep -r -l "6.*mes\|seis.*mes" . --include="*.tsx" --include="*.ts" --include="*.js" --include="*.jsx" 2>/dev/null || true)
        for file in $additional_files; do
            if [[ ! " ${files_to_process[*]} " =~ " ${file} " ]]; then
                echo "📝 Archivo adicional encontrado: $file"
                perform_replacements "$file"
            fi
        done
        
        echo -e "\n✅ CORRECCIONES COMPLETADAS"
        
        # PASO 6: Verificar cambios
        echo -e "\n📊 VERIFICANDO CAMBIOS..."
        for file in "${files_to_process[@]}"; do
            if [ -f "$file" ]; then
                count=$(grep -c "2 meses" "$file" 2>/dev/null || echo "0")
                if [ "$count" -gt 0 ]; then
                    echo "  ✅ $file: $count referencias a '2 meses'"
                fi
            fi
        done
        
        # PASO 7: Build y deploy
        echo -e "\n🔨 CONSTRUYENDO APLICACIÓN..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo "✅ Build completado exitosamente"
            
            echo -e "\n🚀 REINICIANDO APLICACIÓN EN PRODUCCIÓN..."
            cd /var/www/caldas
            pm2 restart academia-caldas
            
            echo -e "\n🎉 ¡CORRECCIONES APLICADAS EXITOSAMENTE!"
            echo "🌐 Verifica los cambios en: https://caldas.mercadolocal.co"
            echo "📦 Backup guardado en: /var/www/caldas/caldas/$backup_dir"
            
        else
            echo "❌ Error en el build. Verificando detalles..."
            npm run build 2>&1 | tail -20
        fi
        
    else
        echo "❌ Correcciones canceladas"
    fi
else
    echo -e "\n✅ No se requieren correcciones"
fi

echo -e "\n📋 INFORMACIÓN CORRECTA DEL PROGRAMA:"
echo "===================================="
echo "✅ Duración: 2 meses"
echo "✅ Acceso: Libre"  
echo "✅ Participación: Voluntaria"
echo "✅ Compromiso: Requerido"
echo ""
echo "🎯 Academia Mercado Local - Norte de Caldas"
