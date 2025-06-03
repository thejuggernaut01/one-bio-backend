import { ENVIRONMENT } from '../../common/config/environment';

const APP_NAME = `${ENVIRONMENT.APP.NAME}`;

export const forgotPasswordEmailTemplate = (tokenUrl: string, name: string) => {
  return `
      <main>
        <h1>Dear ${name},</h1>
        <p>We received a request to reset your password for ${APP_NAME}. If you did not make this request, you can safely ignore this email.</p>
    
        <p>To reset your password, please click the link below:</p>
        <p><a href="${tokenUrl}">Reset Password</a></p>
    
        <p>The link will expire in 30 minutes. If you don't use it within this timeframe, you may need to request a new password reset.</p>
    
        <p>If you have any questions or need further assistance, please don't hesitate to contact us at support@embellishment.com</p>
    
        <p>Best regards,<br>
            ${APP_NAME} Team</p>
      </main>
    `;
};

export const verifyEmailTemplate = (tokenUrl: string, name: string) => {
  return `
      <main>
        <h1>Dear ${name},</h1>
  
        <h2>Welcome to ${APP_NAME}! We're thrilled to have you on board.</h2>
  
        <p>To complete your registration and start using our app, please verify your email address by clicking the link below:</p>
  
        <p><a href="${tokenUrl}">Verify Email Address</a></p>
  
        <p>This link will expire in 30 minutes. If you don't verify your email within this timeframe, you may need to request a new verification link.</p>
  
        <p>Please note that you won't be able to access all features of the app until your email is verified.</p>
  
        <p>If you have any questions or need further assistance, please don't hesitate to contact us at support@embellishment.com</p>
  
        <p>Best regards,<br>
            ${APP_NAME} Team</p>
      </main>
    `;
};

export const welcomeEmailTemplate = (name: string) => {
  return `
      <main>
          <p>Dear ${name},</p>
      
          <p>Welcome to ${APP_NAME}! We're thrilled to have you as part of our fashion-forward community.</p>
      
          <p>At ${APP_NAME}, we believe that style is a way to express who you are. Whether you're looking for the latest trends, timeless classics, or unique statement pieces, we have something to fit every personality and occasion.</p>
      
          <p>Start shopping now and discover your perfect look! From cozy loungewear to sophisticated evening attire, we’ve got you covered for every moment.</p>
      
          <p>If you have any questions or need styling advice, feel free to reach out to our customer support team at support@embellishment.com. We're here to help you with anything you need!</p>
      
          <p>Happy shopping, and welcome to the ${APP_NAME} family!</p>
      
          <p>Best regards,<br>
              The ${APP_NAME} Team</p>
      </main>
    `;
};
