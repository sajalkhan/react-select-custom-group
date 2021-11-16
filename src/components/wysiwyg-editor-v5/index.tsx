/* eslint-disable no-console */
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { mapModifiers, ModifierProp } from '../../libs/component';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './index.scss';

export interface WysiwygEditorV5Props {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  onChange: (value: string) => void;
  value: string;
  size?: 'medium' | 'large';
  modifiers?: ModifierProp<'invalid'>;
}

export const WysiwygEditorV5: React.FC<WysiwygEditorV5Props> = ({
  className: additionalClassName = '',
  size = 'medium',
  modifiers,
  ...props
}) => {
  const componentClassName = mapModifiers('m-wysiwyg-editor-v5', modifiers, size && `size-${size}`);
  const className = `${componentClassName} ${additionalClassName}`.trim();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: `(max-width: 720px)` });
  const [editorHeight, setEditorHeight] = useState<number>(visualViewport.height / 2);

  useEffect(() => {
    visualViewport.addEventListener('resize', () => {
      setEditorHeight(visualViewport.height / 2);
    });
  }, []);

  return (
    <div className={`${className}`}>
      <div className="m-wysiwyg-editor-v5__inner">
        <div
          className={`m-wysiwyg-editor-v5__editor ${isFocused ? 'm-wysiwyg-editor-v5__editor--focused' : ''}`}
          {...(isMobile && {
            style: {
              height: editorHeight,
            },
          })}
        >
          <CKEditor
            config={{
              toolbar: {
                items: [
                  'undo',
                  'redo',
                  '|',
                  'bold',
                  'italic',
                  'underline',
                  'strikethrough',
                  'fontFamily',
                  'fontSize',
                  'fontColor',
                  'fontBackgroundColor',
                  'alignment',
                  'removeFormat',
                  '|',
                  'bulletedList',
                  'numberedList',
                  '|',
                  'link',
                  'imageUpload',
                  'insertTable',
                ],
                // shouldNotGroupWhenFull: true,
              },
              language: 'ja',
              image: {
                toolbar: [
                  'imageTextAlternative',
                  'imageStyle:inline',
                  'imageStyle:block',
                  'imageStyle:side',
                  'linkImage',
                ],
              },
              table: {
                contentToolbar: [
                  'tableColumn',
                  'tableRow',
                  'mergeTableCells',
                  'tableCellProperties',
                  'tableProperties',
                ],
              },
              licenseKey: '',
            }}
            editor={Editor}
            data={props.value}
            onReady={(editor: any) => {
              if (editor) {
                console.log(Array.from(editor.ui.componentFactory.names()));
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }
            }}
            onChange={(event: any, editor: any) => {
              props.onChange(editor.getData());
            }}
            onBlur={(event: any, editor: any) => {
              console.log('Blur.', editor);
              setIsFocused(false);
            }}
            onFocus={(event: any, editor: any) => {
              console.log('Focus.', editor);
              setIsFocused(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};
