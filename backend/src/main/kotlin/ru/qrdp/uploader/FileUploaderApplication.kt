package ru.qrdp.uploader

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FileUploaderApplication

fun main(args: Array<String>) {
    runApplication<FileUploaderApplication>(*args)
}
