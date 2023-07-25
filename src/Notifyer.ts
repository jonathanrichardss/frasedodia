export const Notifyer = {
    async init() {
        const permission = await Notification.requestPermission()
        if (permission !== "granted") {
            throw new Error('Permissão negada.');
        }
    },
    notify({ title, body, image } :any) {
        new Notification(title, {
            body,
            image
        })
    }
}