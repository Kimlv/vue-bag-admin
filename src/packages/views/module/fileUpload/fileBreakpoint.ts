import {FileItem} from './file.type'
import axios from 'axios';
import _ from "lodash";
import {randomId} from "@/packages/utils/utils";

interface optItem {
    chunkSize: number
}


class FileBreakpoint {

    protected chunkSize = 3 * 1024 * 1024; // 设置分片大小
    private chunksLength = 0;
    private dataChunks = [];
    private allChunksUploadStatus = []
    private code = '1'; // 成功状态码
    private timeout = 3 * 60 * 1000

    constructor(opt?: optItem) {
        if (opt?.chunkSize) {
            this.chunkSize = opt?.chunkSize;
        }
        this.opt = opt;
    }

    hasChunk(size: number) {
        return size >= this.chunkSize;
    }

    /**
     * 分割切片
     */
    makeChunks(file: FileItem) {
        const fileChunks = {file, chunks: <Array<any>>[]};
        if (file.size < this.chunkSize) {
            fileChunks.chunks.push({start: 0, end: file.size});
            return fileChunks;
        }
        if (file.size % this.chunkSize === 0) {
            this.chunksLength = Math.round(Math.floor(file.size / this.chunkSize));
        } else {
            this.chunksLength = Math.round(Math.floor(file.size / this.chunkSize)) + 1;
        }
        let leftSize = file.size;
        while (leftSize > 0) {
            const start = fileChunks.chunks.length * this.chunkSize;
            const end = start + this.chunkSize >= file.size ? file.size : start + this.chunkSize;
            leftSize -= end - start;
            fileChunks.chunks.push({start, end});
        }
        return fileChunks;
    }


    /**
     * 上传切片
     */
    upLoadSliceFile() {

    }

    /**
     * 获取切片
     */
    getFileChunks(file: FileItem, success?, error?) {
        const {size} = file;
        this.success = success;
        this.error = error;
        if (this.hasChunk(size)) {
            this.dataChunks = this.makeChunks(file)
            this.allChunksUploadStatus = _.fill(new Array(this.dataChunks.chunks.length), false);
            this.getFormDataChunks();
        } else {
            this.postFileAxios(file);
        }
    }

    /**
     * 计算上传进度
     */
    calUploadProcess() {
        let uploadedCount = 0;
        _.each(this.allChunksUploadStatus, (item) => {
            if (item) uploadedCount++;
        });
        return Number(((uploadedCount * 100) / this.allChunksUploadStatus.length).toFixed(0).valueOf());
    };

    /**
     * 获取FormData格式化的切片
     */
    getFormDataChunks() {
        const formData = new FormData();
        this.dataChunks.chunks.forEach((chunk, index) => {
            formData.append("index", index + "");
            formData.append("chunk", fileChunks.file.slice(chunk.start, chunk.end));
            formData.append("name", fileChunks.file.name);
            formData.append("chunksLength", fileChunks.chunks.length + "");
            formData.append("uid", randomId());
            this.postChunksAxios(formData)
        })
    }

    /**
     * 切片上传
     */
    postChunksAxios(formData) {
        axios.post(this.opt?.url, formData, {
            timeout: this.timeout,
        })
            .then((res) => {
                if (typeof res === "object" && res.data?.code === code) {
                    this.allChunksUploadStatus[index] = true; // 更新标记为
                    this.uploadProcess = this.calUploadProcess(); // 更新上传百分比
                    if (this.uploadProcess === 100) this.success?.()// 完成合并上传
                }
            })
            .catch((err) => {
                this.error?.(err);
            });
    }

    /**
     * 直接上传
     */
    postFileAxios(file) {
        axios.post(this.opt?.url, file, {
            timeout: this.timeout,
        })
            .then((res) => {
                if (typeof res === "object" && res.data?.code === code) {
                    this.success?.()
                }
            })
            .catch((err) => {
                this.error?.(err);
            });
    }
}

export default FileBreakpoint;