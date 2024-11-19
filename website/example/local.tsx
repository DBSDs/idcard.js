import { useState } from "react";
import { Upload, Button, Input, message, UploadProps, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { recognize } from "idcard.js";

export default function () {
  const [data, setdata] = useState({});
  const [loading, setLoading] = useState(false);

  const props: UploadProps = {
    name: "file",
    maxCount: 1,
    accept: ".png,.jpg",
    beforeUpload: (file) => {
      setLoading(true);
      recognize(file, {
        workerPath: "/idcard.js/tesseract/worker.min.js",
        corePath: "/idcard.js/tesseract/tesseract-core.wasm.js",
      })
        .then((res) => {
          const _res = res;
          (_res.orginalData as any) = undefined;
          setdata(res);
        })
        .finally(() => {
          setLoading(false);
        });
      return false;
    },
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />} loading={loading}>
          上传身份证
        </Button>
      </Upload>
      <Spin spinning={loading}>
        <Input.TextArea
          style={{ marginTop: "32px" }}
          disabled
          value={JSON.stringify(data)}
          placeholder="返回结果"
          autoSize={{ minRows: 6, maxRows: 6 }}
        />
      </Spin>
    </>
  );
}
