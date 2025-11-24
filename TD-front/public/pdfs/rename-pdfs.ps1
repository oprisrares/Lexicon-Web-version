$mapping = @{
    "misterul-crimei-fara-cadavru.pdf" = "Misterul crimei fara cadavru.pdf"
    "agatha-christie-ceasurile-pdf.pdf" = "Ceasurile.pdf"
    "Aventurile lui Sherlock Holmes.pdf" = "Aventurile lui Sherlock Holmes.pdf"
    "scurta-istorie-a-omenirii-yuval-noah-harari.pdf" = "Sapiens Scurta istorie a omenirii.pdf"
    "o-scurta-istorie-ilustrata.pdf" = "O scurta istorie ilustrata a romanilor.pdf"
    "Oamenii istoriei - Margaret MacMillan.pdf" = "Oamenii istoriei.pdf"
    "procesul-franz-kafka.pdf" = "Procesul.pdf"
    "dostoievski-crima-si-pedeapsa.pdf" = "Crima si pedeapsa.pdf"
    "Fratii Karamazov vol.1 si 2 - Dostoievski.pdf" = "Fratii Karamazov.pdf"
    "Carl Sagan - Cosmos.pdf" = "Cosmos.pdf"
    "scurta-istorie-a-timpului-stephen-hawking.pdf" = "Scurta istorie a timpului.pdf"
    "Oppenheimer.pdf" = "Oppenheimer.pdf"
    "Jane Austen - Mandrie si prejudecata.pdf" = "Mandrie si prejudecata.pdf"
    "la-rascruce-de-vanturi-emily-bronte.pdf" = "La rascruce de vanturi.pdf"
    "nopti-albe-feodor-mihailovici-dostoievski.pdf" = "Nopti albe.pdf"
    "inteligenta-emotionala-daniel-goleman.pdf" = "Inteligenta emotionala.pdf"
    "Viktor_Frankl_-_Omul_in_cautarea_sensului_vietii.pdf" = "Omul in cautarea sensului vietii.pdf"
    "Paul-Kalanithi-Cu-Ultima-Suflare.pdf" = "Cu ultima suflare.pdf"
    "Ion-Creanga_Amintiri-din-copilarie.pdf" = "Amintiri din copilarie.pdf"
    "Calinescu, George - Enigma Otiliei.pdf" = "Enigma Otiliei.pdf"
    "slavici-ioan-moara-cu-noroc-cartea.pdf" = "Moara cu noroc.pdf"
    "cântecul-celulei-explorare-medicinei-şi-fiinţei-umane-reînnoite.pdf" = "Cantecul celulei.pdf"
    "Revolutia_glucozei_-_Jessie_Inchauspe.pdf" = "Revolutia glucozei.pdf"
}


# Rulează redenumirea
foreach ($oldName in $mapping.Keys) {
    $newName = $mapping[$oldName]
    if (Test-Path $oldName) {
        Rename-Item -Path $oldName -NewName $newName -Force
        Write-Host "Redenumit: $oldName -> $newName"
    } else {
        Write-Host "NU GĂSIT: $oldName"
    }
}