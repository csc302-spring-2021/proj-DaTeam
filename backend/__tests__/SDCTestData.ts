export const form = `
<FormDesign xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ID="Adrenal.Bx.Res.129_3.003.001.REL_sdcFDF" baseURI="www.cap.org/eCC" fullURI="_baseURI=www.cap.org/eCC&amp;_lineage=Adrenal.Bx.Res.129&amp;_version=3.003.001.REL&amp;_docType=sdcFDF" formTitle="ADRENAL GLAND" lineage="Adrenal.Bx.Res.129" filename="Adrenal.Bx.Res.129_3.003.001.REL_sdcFDF.xml" version="3.003.001.REL" xmlns="urn:ihe:qrph:sdc:2016">
 <Property name="Copyright" type="CAPeCC_static_text" styleClass="copyright" order="1" propName="Copyright" val="(c) 2019 College of American Pathologists.  All rights reserved.  License required for use." />
 <Body name="Body" order="15" ID="Adrenal.Bx.Res.129_3.003.001.REL_sdcFDF_Body">
  <ChildItems name="ch_Body" order="16">
   <DisplayedItem name="DI_39617" order="17" ID="39617.100004300" title="# This checklist applies principally to adrenal carcinomas in adults. Pediatric adrenal cortical tumors have different criteria for malignancy and are, in general, treated under protocols that may differ significantly from the recommendations for adult- type tumors.">
    <Property name="p_rptTxt_39617_1" order="18" propName="reportText" val="{no text}" />
   </DisplayedItem>
  </ChildItems>
 </Body>
 <Footer name="footer" order="409" ID="Footer.Adrenal.Bx.Res.129_3.003.001.REL_sdcFDF">
  <Property type="meta" styleClass="copyright" order="410" propName="CopyrightFooter" val="(c) 2019 College of American Pathologists.  All rights reserved.  License required for use." />
 </Footer>
</FormDesign>
`;

export const questionList = `
<Question name="Q_59852" order="82" ID="59852.100004300" title="Histologic Type (Notes C through E)">
  <Property name="p_rptTxt_59852_1" order="83" propName="reportText" val="Histologic Type" />
  <ListField name="lf_59852_2" order="84">
    <List name="lst_59852_3" order="85">
      <ListItem name="LI_2117" order="86" ID="2117.100004300" title="Adrenal cortical carcinoma" />
      <ListItem name="LI_46925" order="87" ID="46925.100004300" title="Adrenal cortical carcinoma, oncocytic type" />
      <ListItem name="LI_44449" order="88" ID="44449.100004300" title="Adrenal cortical carcinoma, myxoid type" />
      <ListItem name="LI_59162" order="89" ID="59162.100004300" title="Adrenal cortical carcinoma, sarcomatoid type" />
    </List>
  </ListField>
  <ChildItems name="ch_59852_1" order="90">
    <Question name="Q_43670" order="91" ID="43670.100004300" title="Histologic Type Comments" mustImplement="false" minCard="0">
      <ResponseField name="rf_43670_1" order="92">
      <Response name="rsp_43670_2" order="93">
        <string name="str_43670_3" order="94" />
      </Response>
      </ResponseField>
    </Question>
  </ChildItems>
</Question>
`;

export const questionTest = `
<Question name="Q_59852" order="82" ID="59852.100004300" title="Histologic Type (Notes C through E)">
<ResponseField name="rf_2132_2" order="131">
<Response name="rsp_2132_3" order="132">
 <decimal name="dec_2132_4" order="133" />
</Response>
<TextAfterResponse name="rtt_2132_5" order="134" val="cm" />
<ResponseUnits name="un_2132_6" order="135" val="cm" unitSystem="UCOM" />
</ResponseField>
<ChildItems name="ch_59852_1" order="90">
<DisplayedItem name="DI_39617" order="17" ID="39617.100004300" title="# This checklist applies principally to adrenal carcinomas in adults. Pediatric adrenal cortical tumors have different criteria for malignancy and are, in general, treated under protocols that may differ significantly from the recommendations for adult- type tumors.">
<Property name="p_rptTxt_39617_1" order="18" propName="reportText" val="{no text}" />
</DisplayedItem>
</ChildItems>
</Question>
`;

export const displayedItem = `
<DisplayedItem name="DI_39617" order="17" ID="39617.100004300" title="# This checklist applies principally to adrenal carcinomas in adults. Pediatric adrenal cortical tumors have different criteria for malignancy and are, in general, treated under protocols that may differ significantly from the recommendations for adult- type tumors.">
<Property name="p_rptTxt_39617_1" order="18" propName="reportText" val="{no text}" />
</DisplayedItem>
`;

export const section = `
<Section name="S_4257" order="19" ID="4257.100004300" minCard="0">
<ChildItems name="ch_4257_1" order="20">
 <Question name="Q_2118" order="21" ID="2118.100004300" minCard="0" readOnly="true">
  <Property name="p_altTxt_2118_1" order="22" propName="altText" val="Tumor Site" />
  <ListField name="lf_2118_2" order="23">
   <List name="lst_2118_3" order="24">
    <ListItem name="LI_2119" order="25" ID="2119.100004300" title="Adrenal gland" selected="true">
     <Property name="p_rptTxt_2119_1" order="26" propName="reportText" val="{no text}" />
    </ListItem>
   </List>
  </ListField>
 </Question>
</ChildItems>
</Section>
`;

export const textField = `
<ResponseField name="rf_2132_2" order="131">
<Response name="rsp_2132_3" order="132">
 <decimal name="dec_2132_4" order="133" />
</Response>
<TextAfterResponse name="rtt_2132_5" order="134" val="cm" />
<ResponseUnits name="un_2132_6" order="135" val="cm" unitSystem="UCOM" />
</ResponseField>
`;

// completely barebones version
export const textField2 = `
<ResponseField>
<Response>
<string val="" />
</Response>
</ResponseField>
`;

export const listField = `
<ListField name="lf_53526_2" order="172" maxSelections="0">
<List name="lst_53526_3" order="173">
 <ListItem name="LI_56752" order="174" ID="56752.100004300" title="Kidney" />
 <ListItem name="LI_57748" order="175" ID="57748.100004300" title="Pancreas" />
</List>
</ListField>
`;

export const listFieldItem = `
<ListItem name="LI_57748" order="175" ID="57748.100004300" title="Pancreas">
  <Property name="p_rptTxt_45594_1" order="181" propName="reportText" val="{no text}" />
  <ListItemResponseField name="lirf_45594_2" order="182" responseRequired="true">
   <Response name="rsp_45594_3" order="183">
    <string name="str_45594_4" order="184" />
   </Response>
  </ListItemResponseField>
</ListItem>
`;
