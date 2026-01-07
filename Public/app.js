function confirmDelete(event) {
    const ok = window.confirm("Are you sure you want to delete this chat?");
    if (!ok) {
        event.preventDefault();
    }
}
