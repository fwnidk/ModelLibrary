declare namespace LogInType {
    interface LogInForm {
        userName: string,
        password: string
    }


    type LogInStatus = 0 | 1 | 2

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

    interface LogInInformation {
        personalInformation: PersonalInformation | null,
        logInStatus: LogInStatus,
    }
}

