import {createClient} from "@supabase/supabase-js";
import cuid from "cuid";

const supabase = createClient(
  'https://kxvmnmkrwutjbepinjxv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4dm1ubWtyd3V0amJlcGluanh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxNjc4MzgsImV4cCI6MjAyMzc0MzgzOH0.qCkZU-A7ajNwvFbF3cJLBYVv513EhEMU7ifCb-4lcQ4'
)
const bucket = 'cl_production_app_bucket';



export const useUploadImage = (dir: string) => {
  const upload = async (file: File) => {
    const ext = file.name.split('.').pop()
    const { data, error } = await supabase.storage.from(bucket).upload(`${dir}/${cuid()}.${ext}`, file)

    if (data) {
      return `https://kxvmnmkrwutjbepinjxv.supabase.co/storage/v1/object/public/${data.fullPath}`
    } else {
      throw error
    }
  }

  return {
    upload
  }
}
