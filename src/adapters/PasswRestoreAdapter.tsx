export interface IPasswRestoreAdapter {
    newpassword: string,
    newpasswordconfirm: string
    
  }
  
  export const PasswRestoreAdapter = (values: IPasswRestoreAdapter) => {
    
    const { newpassword, newpasswordconfirm } = values
    
    return {
        newpassword,
        newpasswordconfirm
    }
  }