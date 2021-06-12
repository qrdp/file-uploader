package ru.qrdp.uploader.controller

import org.springframework.http.MediaType
import org.springframework.http.codec.ServerSentEvent
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import ru.qrdp.uploader.dto.FileData
import ru.qrdp.uploader.dto.QrData
import java.time.LocalTime
import java.util.*


@RestController
@CrossOrigin(origins = ["*"])
@RequestMapping(value = ["/api"])
class UploaderController {

    val emitters = mutableMapOf<UUID, SseEmitter>()

    @GetMapping(value = ["/qr-data"])
    fun getQrData(@RequestParam("info") info: String): QrData = QrData(UUID.randomUUID(), info)


    @GetMapping("/file-data", produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun streamSseMvc(@RequestParam("uuid") uuid: UUID): SseEmitter = SseEmitter().also {
        emitters[uuid] = it
    }

}
