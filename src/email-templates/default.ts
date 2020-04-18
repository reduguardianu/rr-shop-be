import { createReadStream } from 'fs';
import { join } from 'path';
import { Attachment } from '../simple-gmail/models';

export const footerImage001Cid = 'footer.image.001';

// TODO fix here https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
export const DEFAULT_ATTACHMENTS: Attachment[] = [
  {
    cid: footerImage001Cid,
    content: createReadStream(join(__dirname, '/footer-image-001.png')),
    filename: 'footer-image-001.png'
  }
];
