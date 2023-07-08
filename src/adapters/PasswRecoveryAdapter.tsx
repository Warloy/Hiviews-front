export interface IPasswRecoveryAdapter {
    email: string
    
  }
  
  export const PasswRecoveryAdapter = (values: IPasswRecoveryAdapter) => {
    
    const { email } = values
    
    return {
        email: email,
    }
  }