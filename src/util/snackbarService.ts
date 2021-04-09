class SnackbarService {
    private onOpen: Function | null = null;
    
    register(onOpenFunc: Function): void {
        this.onOpen = onOpenFunc;
    }

    open() {
        if (!this.onOpen) {
            return;
        }
        
        this.onOpen();
    }
}

export default new SnackbarService();
