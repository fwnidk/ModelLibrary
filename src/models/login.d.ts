declare namespace LogInType {
    interface LogInForm {
        username: string,
        password: string
    }

    type LogInStatus = 0 | 1 | 2

    interface LogInInformation {
        personalInformation: PersonalInformation | null,
        logInStatus: LogInStatus,
    }
}