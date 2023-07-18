import { getWhatsAppApiInstance } from '../axios/instance';
import { sendTextFunc, sentTextReplyFunc } from './sendText';
import { sendReactionFunc } from './sendReaction'
import { uploadMediaFunc } from './uploadMedia';
import { sendImageFunc, sendReplyImageFunc } from './sendImage';

// Create a Class WhatsApp and initialize the instance
export class WhatsApp {
  private instance: ReturnType<typeof getWhatsAppApiInstance>;
  private token: string;
  private phoneId: string;

  constructor(input: Parameters<typeof getWhatsAppApiInstance>[0]) {
    this.phoneId = input.fromPhoneNumberId
    this.token = input.token || '';
		this.instance = getWhatsAppApiInstance(input);
  }

  // ** METHODS ** //
  
  /**
   * Function to send a text message
   * @param opts Parameters<typeof sendTextFunc>[1]
   * @returns ReturnType<typeof sendTextFunc>
   */
  async sendText(opts: Parameters<typeof sendTextFunc>[1]) {
    return sendTextFunc(this.instance, opts);
  }

  /**
   * Function to send a text reply
   * @param opts Parameters<typeof sentTextReplyFunc>[1]
   * @returns ReturnType<typeof sentTextReplyFunc> 
   */
  async sendTextReply(opts: Parameters<typeof sentTextReplyFunc>[1]) {
    return sentTextReplyFunc(this.instance, opts);
  }

  /**
   * Function to send a reaction
   * @param opts Parameters<typeof sendReactionFunc>[1]
   * @returns ReturnType<typeof sendReactionFunc>
   */
  async sendReaction(opts: Parameters<typeof sendReactionFunc>[1]) {
    return sendReactionFunc(this.instance, opts);
  }

  // Create a method to upload media
  async uploadMedia(opts: Parameters<typeof uploadMediaFunc>[0]) {
    return uploadMediaFunc(opts);
  }

  // Create a method to send an image
  async sendImage(opts: Parameters<typeof sendImageFunc>[1]) {
    return sendImageFunc(this.instance, opts);
  }

  // Create a method to send an image reply
  async sendReplyImage(opts: Parameters<typeof sendReplyImageFunc>[1]) {
    return sendReplyImageFunc(this.instance, opts);
  }
}