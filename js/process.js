var releaseUrl = "https://release.ezmenu.easylsl.com/";
$(document).ready(function () {
    loadWin();
    loadMac();

    // 备用下载链接地址（你可以在这里修改备用地址）
    const backupUrl = "/links.html";

    // 设置备用链接地址
    const backupLink = document.getElementById('backupLink');
    backupLink.href = backupUrl;
});

function loadWin() {
    const url = releaseUrl+'latest.yml';
    fetch(url)
        .then(response => response.text())
        .then(yaml => {
            const data = jsyaml.load(yaml);
            const version = data.version;
            const downloadUrl = data.files[0].url;
            $('#downloadWin').attr('href', releaseUrl + downloadUrl);
            $('#downloadWin').text('下载 Windows 版 v' + version);
        })
        .catch(error => {
            console.error('Error fetching YAML:', error);
        });
}

function loadMac() {
    const url = releaseUrl+'latest-mac.yml';
    fetch(url)
        .then(response => response.text())
        .then(yaml => {
            const data = jsyaml.load(yaml);
            const version = data.version;
            const files = data.files;
            files.forEach(file => {
                if (file.url.includes('dmg')) {
                    $('#downloadMac').attr('href', releaseUrl + file.url);
                    $('#downloadMac').text('下载 macOS 版 v' + version);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching YAML:', error);
        });
}