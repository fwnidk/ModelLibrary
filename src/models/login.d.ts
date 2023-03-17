declare namespace LoginType {
    interface LoginForm {
        userName: string,
        password: string
    }


    type LoginStatus = 0 | 1 | 2

    interface SigninForm {
        userName: string,
        password: string,
        confirmPassword: string,
        team: string
    }

    interface PersonalInformation {
        userName: string,
        team: string,
        avatar: string,
        reserchInterest: Array<string>,
        Organizations: Array<string>,
    }

    interface LoginInformation {
        personalInformation: PersonalInformation | null,
        loginStatus: LoginStatus,
    }
}

