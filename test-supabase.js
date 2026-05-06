import { createClient } from '@supabase/supabase-js';

// Configuración directa para la prueba
const supabaseUrl = 'https://wfiyucykjoohdiazlqbz.supabase.co';
const supabaseKey = 'sb_publishable_wlIN6gMmG_pVr-h-MAaLOw_jUyW4pmB';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
    try {
        console.log('🔄 Testing Supabase connection...');

        // Test 1: Verificar conexión básica intentando contar registros
        const { count, error: connectionError } = await supabase
            .from('volunteers')
            .select('*', { count: 'exact', head: true });

        if (connectionError) {
            console.error('❌ Error de conexión:', connectionError.message);

            if (connectionError.message.includes('relation "public.volunteers" does not exist')) {
                console.log('💡 Causa: La tabla "volunteers" no existe. Ejecuta el script SQL en Supabase.');
            } else if (connectionError.message.includes('JWT') || connectionError.message.includes('auth')) {
                console.log('💡 Causa: Problema de autenticación. Verifica las API keys.');
            } else if (connectionError.message.includes('fetch')) {
                console.log('💡 Causa: Problema de red o URL incorrecta. Verifica la URL del proyecto.');
            } else {
                console.log('💡 Causa: Error desconocido. Revisa la configuración.');
            }

            return false;
        }

        console.log('✅ Conexión exitosa con Supabase');
        console.log(`📊 Registros existentes: ${count || 0}`);

        // Test 2: Intentar insertar un registro de prueba
        const testData = {
            name: 'Usuario de Prueba',
            email: 'test@example.com',
            city: 'Panamá',
            experience: 'intermedio',
            interests: ['eventos', 'contenido'],
            availability: 'flexible'
        };

        console.log('🔄 Intentando insertar registro de prueba...');
        const { data: insertData, error: insertError } = await supabase
            .from('volunteers')
            .insert([testData])
            .select();

        if (insertError) {
            console.error('❌ Error al insertar:', insertError.message);
            console.log('💡 Posible causa: Políticas RLS no permiten inserciones públicas.');
            return false;
        }

        console.log('✅ Inserción exitosa:', insertData);

        // Limpiar el registro de prueba
        if (insertData && insertData[0]) {
            await supabase
                .from('volunteers')
                .delete()
                .eq('id', insertData[0].id);
            console.log('🧹 Registro de prueba eliminado');
        }

        return true;

    } catch (error) {
        console.error('❌ Error inesperado:', error);
        return false;
    }
}

// Ejecutar la prueba
testSupabaseConnection().then(success => {
    if (success) {
        console.log('🎉 ¡Supabase está configurado correctamente!');
        console.log('📝 El formulario debería funcionar ahora.');
    } else {
        console.log('⚠️  Hay problemas con la configuración de Supabase');
        console.log('📋 Revisa las instrucciones en SUPABASE_README.md');
    }
});