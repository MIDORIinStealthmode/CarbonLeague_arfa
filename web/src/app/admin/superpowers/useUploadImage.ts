import {createClient} from "@supabase/supabase-js";
import cuid from "cuid";

const supabaseUrl = 'https://kxvmnmkrwutjbepinjxv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4dm1ubWtyd3V0amJlcGluanh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxNjc4MzgsImV4cCI6MjAyMzc0MzgzOH0.qCkZU-A7ajNwvFbF3cJLBYVv513EhEMU7ifCb-4lcQ4'
const bucket = 'cl_production_app_bucket';

const supabase = createClient(supabaseUrl, supabaseKey)

export const useUploadImage = (dir: string) => {
  const upload = async (file: File) => {
    const ext = file.name.split('.').pop()
    const { data, error } = await supabase.storage.from(bucket).upload(`${dir}/${cuid()}.${ext}`, file)

    if (data) {
      return `${supabaseUrl}/storage/v1/object/public/${bucket}/${data.path}`
    } else {
      throw error
    }
  }

  return {
    upload
  }
}
