if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => {
                console.log("Pendaftaran ServiceWorker berhasil");
            })

            .catch(() => {
                console.log("Pendafataran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browseer ini")
}