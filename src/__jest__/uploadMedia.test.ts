import { uploadMediaFunc } from "../whatsapp/uploadMedia";

describe('uploadMedia', () => {
	it('should be a function', () => {
		expect(typeof uploadMediaFunc).toBe('function');
	});
});
