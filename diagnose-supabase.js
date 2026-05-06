import { createClient } from '@supabase/supabase-js';

// Configuración directa para diagnóstico
const supabaseUrl = 'https://wfiyucykjoohdiazlqbz.supabase.co';
const supabaseKey = 'sb_publishable_wlIN6gMmG_pVr-h-MAaLOw_jUyW4pmB';

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnoseSupabase() {
    console.log('🔍 Diagnóstico de Supabase...\n');

    try {
        // Test básico de conexión
        console.log('1. Probando conexión básica...');
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.log('❌ Error de autenticación:', error.message);
            return;
        }

        console.log('✅ Conexión básica exitosa\n');

        // Test de acceso a tabla
        console.log('2. Probando acceso a tabla "volunteers"...');
        const { data: tableData, error: tableError } = await supabase
            .from('volunteers')
            .select('count', { count: 'exact', head: true });

        if (tableError) {
            console.log('❌ Error al acceder a tabla:', tableError.message);

            if (tableError.message.includes('relation "public.volunteers" does not exist')) {
                console.log('💡 SOLUCIÓN: La tabla no existe. Sigue estos pasos:');
                console.log('   1. Ve a https://supabase.com/dashboard');
                console.log('   2. Selecciona tu proyecto');
                console.log('   3. Ve a "SQL Editor" en el menú lateral');
                console.log('   4. Copia y pega TODO el contenido de supabase-setup.sql');
                console.log('   5. Haz clic en "Run"');
            } else if (tableError.message.includes('permission denied')) {
                console.log('💡 SOLUCIÓN: Problema de permisos. Revisa las políticas RLS en Supabase');
            } else if (tableError.message.includes('fetch failed')) {
                console.log('💡 SOLUCIÓN: Posiblemente la tabla no existe. Ejecuta el script SQL primero.');
            } else {
                console.log('💡 SOLUCIÓN: Error desconocido. Revisa la configuración.');
            }
        } else {
            console.log('✅ Tabla "volunteers" existe y es accesible');
            console.log(`📊 Registros actuales: ${tableData || 0}`);
        }

    } catch (error) {
        console.log('❌ Error de red o configuración:', error.message);
        console.log('💡 SOLUCIÓN: Verifica tu conexión a internet y las credenciales');
    }
}

diagnoseSupabase();