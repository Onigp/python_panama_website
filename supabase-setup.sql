-- Script simplificado para crear tabla de voluntarios en Supabase
-- Ejecutar este script completo en el SQL Editor de Supabase

-- 1. Crear la tabla
CREATE TABLE volunteers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    city TEXT,
    experience TEXT,
    interests TEXT[],
    availability TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear índices para mejor rendimiento
CREATE INDEX idx_volunteers_email ON volunteers(email);
CREATE INDEX idx_volunteers_city ON volunteers(city);

-- 3. Habilitar Row Level Security
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- 4. Crear política para permitir inserciones desde el formulario web
CREATE POLICY "Enable insert for all users" ON volunteers
    FOR INSERT
    WITH CHECK (true);

-- 5. Crear política para permitir lecturas solo para usuarios autenticados (opcional)
CREATE POLICY "Enable read for authenticated users only" ON volunteers
    FOR SELECT
    USING (auth.role() = 'authenticated');