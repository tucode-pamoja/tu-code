const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkProjects() {
    const { data, error } = await supabase
        .from('projects')
        .select('*');

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Projects:', data);
    }
}

checkProjects();
