import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Button, Icon } from 'antd';
import { request, config } from '../../utils';
const {serviceDomain} = config;

class UploadButton extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (info) => {
    let fileList = info.fileList;
    this.props.onChange(fileList);
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = `${serviceDomain}/file/get?id=${file.response.id}`;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return true;
    });

    this.setState({ fileList });
  }

  render() {
    const props = {
      action: `${serviceDomain}/file/upload/`,
      onChange: this.handleChange,
      multiple: true,
    };
    return (
      <Upload {...props} >
        <Button>
          <Icon type="upload" /> upload
        </Button>
      </Upload>
    );
  }
}
export default UploadButton
