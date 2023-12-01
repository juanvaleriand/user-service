const generateVerificationCode = (): string => {
    const codeLength = 6;
    const characters = '0123456789';
    let verificationCode = '';
  
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      verificationCode += characters.charAt(randomIndex);
    }
  
    return verificationCode;
  };
  
  export { generateVerificationCode };
  