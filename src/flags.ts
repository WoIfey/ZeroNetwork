import { flag } from "flags/next"

export const devFlag = flag<boolean>({
    key: 'Maintenance',
    description: 'Make the site show a maintenance page.',
    defaultValue: false,
    decide() {
        return false
    },
})