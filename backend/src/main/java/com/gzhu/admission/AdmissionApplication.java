package com.gzhu.admission;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 中考招生录取模拟系统 —— 后端启动类。
 *
 * <p>当前为基础框架阶段，仅提供健康检查接口用于验证前后端连通性。
 * 业务模块（学校、学生、志愿、计划、录取）由小组成员按协商后的规范补充。</p>
 */
@SpringBootApplication
public class AdmissionApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdmissionApplication.class, args);
    }
}