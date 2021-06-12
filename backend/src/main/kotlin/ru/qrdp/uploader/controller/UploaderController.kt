package ru.qrdp.uploader.controller

import org.slf4j.LoggerFactory
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
    private val log = LoggerFactory.getLogger(javaClass)

    val emitters = mutableMapOf<UUID, SseEmitter>()

    @GetMapping(value = ["/qr-data"])
    fun getQrData(@RequestParam("info") info: String): QrData = QrData(UUID.randomUUID(), info)


    @GetMapping("/file-data", produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun streamSseMvc(@RequestParam("uuid") uuid: UUID): SseEmitter = SseEmitter(60000000).also {
        emitters[uuid] = it
    }

    @PostMapping("/upload")
    fun upload(@RequestBody data: FileData) {
        log.info("Uploaded {}", data.uuid)
        emitters[data.uuid]?.send(data)
    }

}
