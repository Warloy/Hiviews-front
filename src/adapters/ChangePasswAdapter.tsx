export interface IChangePasswAdapter {
    password: string
    newPassw: string
    newPasswConfirm: string
  }
  
  export const changePasswAdapter = (values: IChangePasswAdapter) => {
    
    const { password, newPassw, newPasswConfirm } = values
    
    return {
        password: password,
        newPassw: newPassw,
        newPasswConfirm: newPasswConfirm
    }
  }