require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testing connection to Supabase...');
    try {
        // Try to fetch from 'projects' table
        const { data, error } = await supabase.from('projects').select('*');

        if (error) {
            console.error('Error fetching data:', error.message);
            if (error.code === '42P01') {
                console.error('Table does not exist. Did you run the schema.sql?');
            }
        } else {
            console.log('Connection successful!');
            console.log('Data retrieved:', data);
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

testConnection();
