import React, {useEffect, useState} from 'react';
import {Checkbox, Modal,} from 'antd';
import {RGBColor, SwatchesPicker} from 'react-color';
import {IState} from '../../store';
import {connect} from 'react-redux';
import './modals.styles.less';
import {BgColorsOutlined} from '@ant-design/icons';
import {updateTransactionColorSettingShown, updateTransactionColor} from '../../features/transactions/actions';
import {Button as FloatButton, darkColors, lightColors} from "react-floating-action-button";
import {Transaction} from '../../features/transactions/interface';

type TransactionColorSettingProps = {
  transaction: Transaction | undefined;
  transactionColorSettingShown: boolean;
  updateTransactionColor: (
    transactionId: number,
    color: string | undefined,
  ) => void;
  updateTransactionColorSettingShown: (
    visible: boolean
  ) => void;
};

const TransactionColorSettingDialog: React.FC<TransactionColorSettingProps> = (props) => {
  const {
    transaction,
    transactionColorSettingShown,
    updateTransactionColorSettingShown,
    updateTransactionColor,
  } = props;
  
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [bgColor, setBgColor] = useState({
    r: '0',
    g: '0',
    b: '0',
    a: '0',
  });

  useEffect(() => {
    const show = !!transaction && !!transaction.color;
    setDisplayColorPicker(show);
    setBgColor(show && transaction?.color ? JSON.parse(transaction.color) : {
      r: '0',
      g: '0',
      b: '0',
      a: '0',
    });
  }, [transaction]);

  const onCheckColorIcon = (e: any) => {
    setDisplayColorPicker(!displayColorPicker);
    if (!e.target.checked && transaction) {
      updateTransactionColor(transaction.id, undefined);
      setBgColor({
        r: '0',
        g: '0',
        b: '0',
        a: '0',
      })
    } 
  }

  const handleColorChange = (c : any , event : any) => {
    if (transaction) {
      updateTransactionColor(transaction.id, JSON.stringify(c.rgb));
    }
    setBgColor(c.rgb);    
  };  

  const color : RGBColor = {
    r: Number(bgColor.r),
    g: Number(bgColor.g),
    b: Number(bgColor.b),
    a: Number(bgColor.a),
  }

  const openModal = () => updateTransactionColorSettingShown(true);
  const closeModal = () => updateTransactionColorSettingShown(false);

  const getModal = () => (
    <Modal
      visible={transactionColorSettingShown}
      onCancel={closeModal}
      footer={false}
    >
      <div>
        <Checkbox
            style={{marginTop: '-0.5em'}}
            checked={displayColorPicker}
            onChange={onCheckColorIcon}
        >
            Set background color
        </Checkbox>
        <BgColorsOutlined />

        <div>
            { displayColorPicker && 
            <div>
              <SwatchesPicker
              color={color}
              onChange={handleColorChange}
              width={420} 
              height={130}
              colors={[['#FCE9DA', '#FFCEC7', '#FFD0A6', '#E098AE'], 
                      ['#EFEFF1', '#ECD4D4', '#CCDBE2', '#C9CBE0'], 
                      ['#E9E1D4', '#F5DDAD', '#F1BCAE', '#C9DECF'], 
                      ['#F2EEE5', '#E5C1C5', '#C3E2DD', '#6ECEDA'], 
                      ['#D5E1DF', '#EACACB', '#E2B3A3', '#A3B6C5'],
                      ['#FDF2F0', '#F8DAE2', '#DEB3CF', '#B57FB3'],
                      ['#FAF0E4', '#EECFBB', '#F6B99D', '#CB8A90'],
                      ['#FEF5D4', '#FFD6AA', '#EFBAD6', '#DADAFC']]}
              />
            </div>}
        </div>
      </div>      
    </Modal>
  );

  return (
      <>
        <FloatButton
            tooltip="Set Background Color"
            onClick={openModal}
            styles={{backgroundColor: darkColors.grey, color: lightColors.white, fontSize: '25px'}}
        >
          <BgColorsOutlined />
        </FloatButton>
        {getModal()}
      </>
  );
};

const mapStateToProps = (state: IState) => ({
  transaction: state.transaction.transaction,
  transactionColorSettingShown: state.transaction.transactionColorSettingShown,
});

export default connect(mapStateToProps, {
  updateTransactionColorSettingShown,
  updateTransactionColor,
})(TransactionColorSettingDialog);
