package ru.qrdp.uploader.controller

import org.springframework.web.bind.annotation.*
import ru.qrdp.uploader.dto.QrData
import java.util.*

@RestController
@CrossOrigin(origins = ["*"])
@RequestMapping(value = ["/api"])
class UploaderController {

    @GetMapping(value = ["/qr-data"])
    fun getQrData(@RequestParam("info") info: String): QrData = QrData(UUID.randomUUID(), info)
    
}
