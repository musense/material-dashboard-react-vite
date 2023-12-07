const MuEditorConfig = {
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading2' },
      { model: 'heading2', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading3' },
      {
        model: 'heading3Custom',
        view: {
          name: 'h4',
          classes: 'h4_Custom'
        },
        title: 'Heading 3',
        class: 'ck-heading_heading4_h4_Custom'
      },
    ]
  },
  toolbar: {
    items: [
      'bold', 'italic', 'underline', 'strikethrough', 'link', 'bulletedList', 'numberedList', 'outdent', 'indent', 'alignment', 'insertTable', '|',
      'heading', 'style', '|',
      'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', 'highlight', 'code', 'codeBlock', 'blockQuote', '|',
      'imageUpload', 'imageInsert', 'mediaEmbed', '|',
      'undo', 'redo', 'findAndReplace', 'showBlocks', 'htmlEmbed', 'sourceEditing', 'selectAll', 'removeFormat', 'superscript', 'subscript', 'restrictedEditingException', 'specialCharacters', 'horizontalLine'
    ]
  },
  link: {
    addTargetToExternalLinks: true,
    decorators: [
      {
        mode: 'manual',
        label: '另開連結',
        attributes: {
          target: '_blank',
        }
      }
    ]
  },
  removePlugins: ['Style'],
  ui: {
    viewportOffset: {
      right: 0,
    }
  }
}

export default MuEditorConfig; 
