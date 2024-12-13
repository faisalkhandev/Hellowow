
"use server"

import CloudConvert from 'cloudconvert';

export async function convertVsdToPptx(formData: FormData) {
  try {
    const cloudConvert = new CloudConvert(process.env.CLOUD_CONVERT_API!);
    const file = formData.get('file') as File; // Type assertion to File
    if (!file) {
      return { error: 'No file found in form data.' };
    }

    // Step 1: Create a job in CloudConvert
    const job = await cloudConvert.jobs.create({
      tasks: {
        'import-1': {
          operation: 'import/upload',
        },
        'convert-1': {
          operation: 'convert',
          input: 'import-1',
          output_format: 'pptx',
        },
        'export-1': {
          operation: 'export/url',
          input: 'convert-1',
        },
      },
    });

    // Step 2: Upload the file directly to CloudConvert
    const uploadTask = job.tasks.find(task => task.name === 'import-1');
    const uploadUrl = uploadTask?.result!.form.url;

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file, // Use the File object directly
    });

    if (!uploadResponse.ok) {
      return { error: 'Failed to upload the file to CloudConvert.' };
    }

    // Step 3: Wait for the job to complete
    const completedJob = await cloudConvert.jobs.wait(job.id);

    // Step 4: Get the download URL
    const exportTask = completedJob.tasks.find(task => task.name === 'export-1');
    if (exportTask?.result?.files?.[0]) {
      const downloadUrl = exportTask.result.files[0].url;
      return { downloadUrl };
    }

    return { error: 'Conversion failed or no download URL available.' };
  } catch (error) {
    console.error(error,"Error is s"); // Log the error for debugging
    return { error: 'Something went wrong. Please try again.' };
  }
}
