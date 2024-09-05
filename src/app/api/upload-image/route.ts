import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '../../../utils/cloudinary';

export async function POST(req: NextRequest) {
  console.log('Received request to upload image');
  const { imageData } = await req.json();

  if (!imageData) {
    console.error('No image data received');
    return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
  }

  try {
    console.log('Uploading image to Cloudinary');
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(imageData, { folder: 'roasts' }, (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          console.log('Cloudinary upload successful');
          resolve(result);
        }
      });
    });

    console.log('Cloudinary upload result:', result);
    return NextResponse.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

