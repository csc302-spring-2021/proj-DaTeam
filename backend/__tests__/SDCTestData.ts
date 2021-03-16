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

export const question = `
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
<Question name="Q_49275" order="95" ID="49275.100004300" title="Histologic Grade (Notes C through E)">
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
export const textField2 = `<ResponseField>
									<Response>
										<string val="" />
									</Response>
								</ResponseField>`;

export const listField = `
<ListField name="lf_53526_2" order="172" maxSelections="0">
<List name="lst_53526_3" order="173">
 <ListItem name="LI_56752" order="174" ID="56752.100004300" title="Kidney" />
 <ListItem name="LI_57748" order="175" ID="57748.100004300" title="Pancreas" />
</List>
</ListField>
`;

export const listFieldItem = `
<ListItem name="LI_57748" order="175" ID="57748.100004300" title="Pancreas" />
  <Property name="p_rptTxt_45594_1" order="181" propName="reportText" val="{no text}" />
  <ListItemResponseField name="lirf_45594_2" order="182" responseRequired="true">
   <Response name="rsp_45594_3" order="183">
    <string name="str_45594_4" order="184" />
   </Response>
  </ListItemResponseField>
</ListItem>
`;

export const rawForm = `<?xml version="1.0" encoding="utf-8"?>
        <?xml-stylesheet type="text/xsl" href="sdctemplate.xslt"?>
        <SDCPackage xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:ihe:qrph:sdc:2016" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="urn:ihe:qrph:sdc:2016 ../Schemas/RFD+SDCRetrieveForm.xsd" packageID="PKG_LDCT_Lung" version="1.0.0" lineage="LDCTLung" fullURI="_baseURI=www.cancercare.on.ca/LDCTlung/SDC/IHE/&amp;_lineage=LDCTLung&amp;_version=1.0.0&amp;_docType=sdcPKG">
          <XMLPackage>
            <FormDesign xmlns="urn:ihe:qrph:sdc:2016" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:ihe:qrph:sdc:2016 SDCFormDesign.xsd" ID="FORM_LDCT_Lung" formTitle="Lung Cancer Screening Template" baseURI="www.cancercare.on.ca/LDCTlung/SDC/IHE/" version="1.0.0" lineage="LDCTLung" fullURI="_baseURI=www.cancercare.on.ca/LDCTlung/SDC/IHE/&amp;_lineage=LDCTLung&amp;_version=1.0.0&amp;_docType=sdcFDF">
              <Property type="meta" styleClass="copyright" order="1" propName="Copyright" val="(c) 2017 Cancer Care Ontario.  All rights reserved." />
              <Property propName="Approval" propClass="meta" order="2" styleClass="float-right" val="CCO Cancer Imaging Program approved" />
              <Property propName="GenericHeaderText" type="meta" styleClass="left" val="High Risk Lung Cancer Screening Summary (Checklist)" />
              <Property propName="OfficialName" propClass="meta" val="LDCT Lung Cancer Screening Reporting Template" />
              <Property propName="Category" propClass="meta" val="Thoracic" />
              <Property propName="Restrictions" propClass="meta" val="Protocol LDCT Lung Cancer Screening." />
              <Property propName="Required" propClass="meta" val="true" />
              <Property propName="CTV_Dkey" propClass="meta" val="" />
              <Property propName="ChecklistCKey" propClass="meta" val="" />
              <Property propName="VersionID" propClass="meta" val="1.1" />
              <Property propName="CurrentFileName" propClass="meta" val="LDCT Lung Screening Pilot ver 1.1" />
              <Property propName="ApprovalStatus" propClass="meta" val="0" />
              <Property propName="EffectiveDate" propClass="meta" val="2017-02-24" styleClass="right" />
              <Body title="LDCT Lung Screening Template" ID="root" styleClass="title">
                <Property propName="Publisher" propClass="Reporttext" val="Cancer Care Ontario" />
                <Property propName="Version" propClass="Reporttext" val="version 1.1" />
                <Property propName="ReleaseDate" propClass="Reporttext" val="2017-02-24" />
                <Contact>
                  <Organization>
                    <OrgName val="Cancer Care Ontario" />
                    <Email>
                      <EmailAddress val="alexander.goel@cancercare.on.ca" />
                    </Email>
                    <Email>
                      <EmailAddress val="david.kwan@cancercare.on.ca" />
                    </Email>
                  </Organization>
                </Contact>
                <ChildItems>
                  <Section title="CLINICAL INFORMATION" type="level1" ID="000001">
                    <CodedValue>
                      <Code val="55752-0" />
                      <CodeText val="Clinical Information" />
                      <CodeSystem>
                        <CodeSystemName val="LOINC" />
                      </CodeSystem>
                    </CodedValue>
                    <ChildItems>
                      <Question title="Clinical Information:" ID="000002">
                        <Property propClass="numbering" propName="numbering" val="1." />
                        <ResponseField>
                          <Response>
                            <string val="" />
                          </Response>
                        </ResponseField>
                      </Question>
                      <Question title="Reason for exam:" ID="000004">
                        <Property propClass="numbering" propName="numbering" val="2." />
                        <CodedValue>
                          <Code val="RID10393" />
                          <CodeText val="imaging purpose" />
                          <CodeSystem>
                            <CodeSystemName val="RADLEX" />
                          </CodeSystem>
                        </CodedValue>
                        <ListField>
                          <List>
                            <ListItem title="Baseline scan" ID="000005">
                              <CodedValue>
                                <Code val="RID49571" />
                                <CodeText val="Baseline" />
                                <CodeSystem>
                                  <CodeSystemName val="RADLEX" />
                                </CodeSystem>
                              </CodedValue>
                            </ListItem>
                            <ListItem title="12 month recall" ID="000006">
                              <CodedValue>
                                <Code val="RID50144" />
                                <CodeText val="12 month follow-up procedure" />
                                <CodeSystem>
                                  <CodeSystemName val="RADLEX" />
                                </CodeSystem>
                              </CodedValue>
                            </ListItem>
                            <ListItem title="6 month follow-up" ID="000007">
                              <CodedValue>
                                <Code val="RID50145" />
                                <CodeText val="6 month follow-Up" />
                                <CodeSystem>
                                  <CodeSystemName val="RADLEX" />
                                </CodeSystem>
                              </CodedValue>
                            </ListItem>
                            <ListItem title="3 month follow-up" ID="777777">
                              <CodedValue>
                                <Code val="RID50239" />
                                <CodeText val="3-month follow-up procedure" />
                                <CodeSystem>
                                  <CodeSystemName val="RADLEX" />
                                </CodeSystem>
                              </CodedValue>
                            </ListItem>
                            <ListItem title="Other follow-up" ID="000008">
                              <CodedValue>
                                <Code val="RID35965" />
                                <CodeText val="Follow-up procedure" />
                                <CodeSystem>
                                  <CodeSystemName val="RADLEX" />
                                </CodeSystem>
                              </CodedValue>
                            </ListItem>
                          </List>
                        </ListField>
                      </Question>
                    </ChildItems>
                  </Section>
                  <Section title="COMPARISON STUDIES" type="level1" ID="000010">
                    <CodedValue>
                      <Code val="18834-2" />
                      <CodeText val="Radiology Comparison study" />
                      <CodeSystem>
                        <CodeSystemName val="LOINC" />
                      </CodeSystem>
                    </CodedValue>
                    <ChildItems>
                      <Question title="Comparison Study:" ID="000011">
                        <Property propClass="numbering" propName="numbering" val="1." />
                        <ListField>
                          <List>
                            <ListItem title="None Available" ID="000012" />
                            <ListItem title="Previous CT Exam:" ID="000013">
                              <CodedValue>
                                <Code val="RID28454" />
                                <CodeText val="comparison image" />
                                <CodeSystem>
                                  <CodeSystemName val="RADLEX" />
                                </CodeSystem>
                              </CodedValue>
                              <ChildItems>
                                <Question ID="000014" maxCard="0">
                                  <ResponseField>
                                    <Response>
                                      <date xsi:nil="true" />
                                    </Response>
                                    <TextAfterResponse val="(dates)" />
                                  </ResponseField>
                                </Question>
                              </ChildItems>
                            </ListItem>
                          </List>
                        </ListField>
                      </Question>
                    </ChildItems>
                  </Section>
                  <Section title="IMAGING PROCEDURE DESCRIPTION" type="level1" ID="000016">
                    <CodedValue>
                      <Code val="55111-9" />
                      <CodeText val="Current imaging procedure descriptions" />
                      <CodeSystem>
                        <CodeSystemName val="LOINC" />
                      </CodeSystem>
                    </CodedValue>
                    <ChildItems>
                      <Question title="Overall Image Quality:" ID="000017">
                        <Property propClass="numbering" propName="numbering" val="1." />
                        <CodedValue>
                          <Code val="RID10" />
                          <CodeText val="image quality" />
                          <CodeSystem>
                            <CodeSystemName val="RADLEX" />
                          </CodeSystem>
                        </CodedValue>
                        <ListField numCols="3">
                          <DefaultCodeSystem>
                            <CodeSystemName val="RADLEX" />
                            <OID val="2.16.840.1.113883.6.256" />
                          </DefaultCodeSystem>
                          <List>
                            <ListItem title="Adequate" ID="000018">
                              <CodedValue>
                                <Code val="RID11" />
                                <CodeText val="exemplary quality" />
                              </CodedValue>
                            </ListItem>
                            <ListItem title="Suboptimal" ID="000019">
                              <CodedValue>
                                <Code val="RID13" />
                                <CodeText val="limited quality" />
                              </CodedValue>
                            </ListItem>
                            <ListItem title="Non-diagnostic" ID="000020">
                              <CodedValue>
                                <Code val="RID14" />
                                <CodeText val="non-diagnostic quality" />
                              </CodedValue>
                            </ListItem>
                          </List>
                        </ListField>
                      </Question>
                      <Question title="Procedure protocol:" ID="000021">
                        <Property propClass="numbering" propName="numbering" val="2." />
                        <CodedValue>
                          <Code val="RID38760" />
                          <CodeText val="imaging protocol" />
                          <CodeSystem>
                            <CodeSystemName val="RADLEX" />
                          </CodeSystem>
                        </CodedValue>
                        <ListField>
                          <List>
                            <ListItem title="LDCT Study Protocol" ID="000022">
                              <CodedValue>
                                <Code val="RPID1377" />
                                <CodeText val="CT CHEST LOW DOSE SCREENING" />
                                <CodeSystem>
                                  <CodeSystemName val="RADLEX" />
                                </CodeSystem>
                              </CodedValue>
                            </ListItem>
                            <ListItem title="Other" ID="000023">
                              <ListItemResponseField>
                                <Response>
                                  <string val="" />
                                </Response>
                              </ListItemResponseField>
                            </ListItem>
                          </List>
                        </ListField>
                      </Question>
                      <Question title="All measurements obtained on axial CT lung reconstruction series:" ID="000025">
                        <Property propClass="numbering" propName="numbering" val="3." />
                        <ResponseField>
                          <Response>
                            <string val="" />
                          </Response>
                        </ResponseField>
                      </Question>
                    </ChildItems>
                  </Section>
                  <Section title="FINDINGS" type="level1" ID="000026">
                    <CodedValue>
                      <Code val="59776-5" />
                      <CodeText val="Procedure Findings" />
                      <CodeSystem>
                        <CodeSystemName val="LOINC" />
                      </CodeSystem>
                    </CodedValue>
                    <ChildItems>
                      <Section title="Nodules" ID="000027">
                        <Property propClass="numbering" propName="numbering" val="A." />
                        <ChildItems>
                          <Question title="Number of lung nodules present in total (any size):" ID="000028">
                            <Property propClass="numbering" propName="numbering" val="1." />
                            <CodedValue>
                              <Code val="RID50150" />
                              <CodeText val="Number of pulmonary nodules" />
                              <CodeSystem>
                                <CodeSystemName val="RADLEX" />
                              </CodeSystem>
                            </CodedValue>
                            <ResponseField>
                              <Response>
                                <positiveInteger xsi:nil="true" />
                              </Response>
                            </ResponseField>
                          </Question>
                          <DisplayedItem ID="8345982" title="(Any size. If more than 10 nodules please enter &quot;11&quot;)" />
                          <DisplayedItem ID="3820948" title="The 10 most dominant nodules (= 4 mm) need to be measured." />
                          <Question title="Number of dominant nodule(s) = 4mm:" ID="23489279">
                            <!--For Rich: Can we make this section a conditional owner so that if the answer is 0 no nodule section is displayed, and if the answer is >0 the Nodule section is displayed?-->
                            <Property propClass="numbering" propName="numbering" val="2." />
                            <ResponseField>
                              <Response>
                                <positiveInteger xsi:nil="true" />
                              </Response>
                            </ResponseField>
                          </Question>
                          <DisplayedItem ID="50697" title="(Call up nodule macro if 1 or more dominant nodule(s))" />
                          <Section ID="000032" title="Nodule:" minCard="0" maxCard="11">
                            <CodedValue>
                              <Code val="RID50149" />
                              <CodeText val="pulmonary nodule" />
                              <CodeSystem>
                                <CodeSystemName val="RADLEX" />
                              </CodeSystem>
                            </CodedValue>
                            <ChildItems>
                              <!--AG: not sure how to do this question since it should be in line with the section title. Could it be automatically numbered based on the nodule number (e.g. auotmatically enter Nodule [1], Nodule [2], etc.?-->
                              <!--AG: Ideally nodules should be numbered automatically without user input, for now users will have to enter the nodule number (e.g. Nodule [1], Nodule [2]-->
                              <Question title="Nodule Number:" ID="592375972">
                                <ResponseField>
                                  <Response>
                                    <positiveInteger xsi:nil="true" />
                                  </Response>
                                </ResponseField>
                              </Question>
                              <Question title="Image Number:" ID="000033">
                                <Property propClass="numbering" propName="numbering" val="i." />
                                <ResponseField>
                                  <Response>
                                    <string val="" />
                                    <!-- should this be an integer? <integer xsi:nil="true"/>-->
                                  </Response>
                                </ResponseField>
                              </Question>
                              <Question title="Lobe:" ID="000035">
                                <Property propClass="numbering" propName="numbering" val="ii." />
                                <CodedValue>
                                  <Code val="RID34694" />
                                  <CodeText val="lobe of lung" />
                                  <CodeSystem>
                                    <CodeSystemName val="RADLEX" />
                                  </CodeSystem>
                                </CodedValue>
                                <ListField numCols="6">
                                  <DefaultCodeSystem>
                                    <CodeSystemName val="RADLEX" />
                                    <OID val="2.16.840.1.113883.6.256" />
                                  </DefaultCodeSystem>
                                  <List>
                                    <ListItem title="RUL" ID="000036">
                                      <CodedValue>
                                        <Code val="RID1303" />
                                        <CodeText val="upper lobe of right lung" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="RML" ID="000037">
                                      <CodedValue>
                                        <Code val="RID1310" />
                                        <CodeText val="middle lobe of lung (part of Right lung)" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="RLL" ID="000038">
                                      <CodedValue>
                                        <Code val="RID1315" />
                                        <CodeText val="lower lobe of right lung" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="LUL" ID="000039">
                                      <CodedValue>
                                        <Code val="RID1327" />
                                        <CodeText val="upper lobe of left lung" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="Lingula" ID="000040">
                                      <CodedValue>
                                        <Code val="RID1333" />
                                        <CodeText val="lingula" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="LLL" ID="000041">
                                      <CodedValue>
                                        <Code val="RID1338" />
                                        <CodeText val="lower lobe of left lung" />
                                      </CodedValue>
                                    </ListItem>
                                  </List>
                                </ListField>
                              </Question>
                              <Question title="Location:" ID="000042">
                                <Property propClass="numbering" propName="numbering" val="iii." />
                                <CodedValue>
                                  <Code val="RID5817" />
                                  <CodeText val="location descriptor" />
                                  <CodeSystem>
                                    <CodeSystemName val="RADLEX" />
                                  </CodeSystem>
                                </CodedValue>
                                <ListField numCols="3">
                                  <DefaultCodeSystem>
                                    <CodeSystemName val="RADLEX" />
                                    <OID val="2.16.840.1.113883.6.256" />
                                  </DefaultCodeSystem>
                                  <List>
                                    <ListItem title="Parenchymal" ID="000043">
                                      <CodedValue>
                                        <Code val="RID35739" />
                                        <CodeText val="lung parenchyma" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="Subpleural" ID="000044">
                                      <CodedValue>
                                        <Code val="RID46032" />
                                        <CodeText val="subpleural" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="Fissural" ID="000045">
                                      <CodedValue>
                                        <Code val="RID43257" />
                                        <CodeText val="pulmonary fissure" />
                                      </CodedValue>
                                    </ListItem>
                                  </List>
                                </ListField>
                              </Question>
                              <Question title="Attenuation:" ID="000046">
                                <Property propClass="numbering" propName="numbering" val="iv." />
                                <CodedValue>
                                  <Code val="RID6037" />
                                  <CodeText val="attenuation characteristic" />
                                  <CodeSystem>
                                    <CodeSystemName val="RADLEX" />
                                  </CodeSystem>
                                </CodedValue>
                                <ListField>
                                  <List>
                                    <ListItem title="Solid" ID="000047">
                                      <CodedValue>
                                        <Code val="RID50151" />
                                        <CodeText val="solid pulmonary nodule" />
                                        <CodeSystem>
                                          <CodeSystemName val="RADLEX" />
                                        </CodeSystem>
                                      </CodedValue>
                                      <ChildItems>
                                        <Question title="Mean diameter:" ID="000048">
                                          <CodedValue>
                                            <Code val="RID50155" />
                                            <CodeText val="average diameter" />
                                            <CodeSystem>
                                              <CodeSystemName val="RADLEX" />
                                            </CodeSystem>
                                          </CodedValue>
                                          <ResponseField>
                                            <Response>
                                              <integer xsi:nil="true" />
                                            </Response>
                                            <ResponseUnits val="mm" />
                                          </ResponseField>
                                        </Question>
                                        <Question title="+Length:" ID="000049" minCard="0">
                                          <!-- <CodedValue>                                                <Code val="RID39123"/>                                                <CodeText val="length"/>                                                <CodeSystem>                                                   <CodeSystemName val="RADLEX"/>                                                </CodeSystem>                                             </CodedValue>-->
                                          <ResponseField>
                                            <Response>
                                              <integer xsi:nil="true" />
                                            </Response>
                                            <ResponseUnits val="mm" />
                                          </ResponseField>
                                        </Question>
                                        <Question title="+Width:" ID="000050" minCard="0">
                                          <!--  <CodedValue>                                                <Code val="RID39144"/>                                                <CodeText val="width"/>                                                <CodeSystem>                                                   <CodeSystemName val="RADLEX"/>                                                </CodeSystem>                                             </CodedValue>-->
                                          <ResponseField>
                                            <Response>
                                              <integer xsi:nil="true" />
                                            </Response>
                                            <ResponseUnits val="mm" />
                                          </ResponseField>
                                        </Question>
                                      </ChildItems>
                                    </ListItem>
                                    <ListItem title="Part-solid" ID="000051">
                                      <CodedValue>
                                        <Code val="RID50152" />
                                        <CodeText val="part-solid pulmonary nodule" />
                                        <CodeSystem>
                                          <CodeSystemName val="RADLEX" />
                                        </CodeSystem>
                                      </CodedValue>
                                      <ChildItems>
                                        <Section title="Overall size:" type="level3" ID="000052">
                                          <ChildItems>
                                            <Question title="Mean diameter:" ID="000053">
                                              <CodedValue>
                                                <Code val="RID50155" />
                                                <CodeText val="average diameter" />
                                                <CodeSystem>
                                                  <CodeSystemName val="RADLEX" />
                                                </CodeSystem>
                                              </CodedValue>
                                              <ResponseField>
                                                <Response>
                                                  <integer xsi:nil="true" />
                                                </Response>
                                                <ResponseUnits val="mm" />
                                              </ResponseField>
                                            </Question>
                                            <Question title="+Length:" ID="000054" minCard="0">
                                              <!--<CodedValue>                                                      <Code val="RID39123"/>                                                      <CodeText val="length"/>                                                      <CodeSystem>                                                         <CodeSystemName val="RADLEX"/>                                                      </CodeSystem>                                                   </CodedValue>-->
                                              <ResponseField>
                                                <Response>
                                                  <integer xsi:nil="true" />
                                                </Response>
                                                <ResponseUnits val="mm" />
                                              </ResponseField>
                                            </Question>
                                            <Question title="+Width:" ID="000055" minCard="0">
                                              <!--<CodedValue>                                                      <Code val="RID39144"/>                                                      <CodeText val="width"/>                                                      <CodeSystem>                                                         <CodeSystemName val="RADLEX"/>                                                      </CodeSystem>                                                   </CodedValue>-->
                                              <ResponseField>
                                                <Response>
                                                  <integer xsi:nil="true" />
                                                </Response>
                                                <ResponseUnits val="mm" />
                                              </ResponseField>
                                            </Question>
                                          </ChildItems>
                                        </Section>
                                        <Section title="Size of Solid component:" type="level3" ID="000056">
                                          <CodedValue>
                                            <Code val="RID50154" />
                                            <CodeText val="solid component of part-solid pulmonary nodule" />
                                            <CodeSystem>
                                              <CodeSystemName val="RADLEX" />
                                            </CodeSystem>
                                          </CodedValue>
                                          <ChildItems>
                                            <Question title="Mean diameter:" ID="000057">
                                              <CodedValue>
                                                <Code val="RID50155" />
                                                <CodeText val="average diameter" />
                                                <CodeSystem>
                                                  <CodeSystemName val="RADLEX" />
                                                </CodeSystem>
                                              </CodedValue>
                                              <ResponseField>
                                                <Response>
                                                  <integer xsi:nil="true" />
                                                </Response>
                                                <ResponseUnits val="mm" />
                                              </ResponseField>
                                            </Question>
                                            <Question title="+Length:" ID="000058" minCard="0">
                                              <!--<CodedValue>                                                      <Code val="RID39123"/>                                                      <CodeText val="length"/>                                                      <CodeSystem>                                                         <CodeSystemName val="RADLEX"/>                                                      </CodeSystem>                                                   </CodedValue>-->
                                              <ResponseField>
                                                <Response>
                                                  <integer xsi:nil="true" />
                                                </Response>
                                                <ResponseUnits val="mm" />
                                              </ResponseField>
                                            </Question>
                                            <Question title="+Width:" ID="000059" minCard="0">
                                              <!--<CodedValue>                                                      <Code val="RID39144"/>                                                      <CodeText val="width"/>                                                      <CodeSystem>                                                         <CodeSystemName val="RADLEX"/>                                                      </CodeSystem>                                                   </CodedValue>-->
                                              <ResponseField>
                                                <Response>
                                                  <integer xsi:nil="true" />
                                                </Response>
                                                <ResponseUnits val="mm" />
                                              </ResponseField>
                                            </Question>
                                          </ChildItems>
                                        </Section>
                                      </ChildItems>
                                    </ListItem>
                                    <ListItem title="Pure Ground Glass" ID="000060">
                                      <CodedValue>
                                        <Code val="RID50153" />
                                        <CodeText val="non-solid pulmonary nodule" />
                                        <CodeSystem>
                                          <CodeSystemName val="RADLEX" />
                                        </CodeSystem>
                                      </CodedValue>
                                      <ChildItems>
                                        <Question title="Mean diameter:" ID="000061">
                                          <CodedValue>
                                            <Code val="RID50155" />
                                            <CodeText val="average diameter" />
                                            <CodeSystem>
                                              <CodeSystemName val="RADLEX" />
                                            </CodeSystem>
                                          </CodedValue>
                                          <ResponseField>
                                            <Response>
                                              <integer xsi:nil="true" />
                                            </Response>
                                            <ResponseUnits val="mm" />
                                          </ResponseField>
                                        </Question>
                                        <Question title="+Length:" ID="000062" minCard="0">
                                          <!--<CodedValue>                                                <Code val="RID39123"/>                                                <CodeText val="length"/>                                                <CodeSystem>                                                   <CodeSystemName val="RADLEX"/>                                                </CodeSystem>                                             </CodedValue>-->
                                          <ResponseField>
                                            <Response>
                                              <integer xsi:nil="true" />
                                            </Response>
                                            <ResponseUnits val="mm" />
                                          </ResponseField>
                                        </Question>
                                        <Question title="+Width:" ID="000063" minCard="0">
                                          <!--<CodedValue>                                                <Code val="RID39144"/>                                                <CodeText val="width"/>                                                <CodeSystem>                                                   <CodeSystemName val="RADLEX"/>                                                </CodeSystem>                                             </CodedValue>-->
                                          <ResponseField>
                                            <Response>
                                              <integer xsi:nil="true" />
                                            </Response>
                                            <ResponseUnits val="mm" />
                                          </ResponseField>
                                        </Question>
                                      </ChildItems>
                                    </ListItem>
                                  </List>
                                </ListField>
                              </Question>
                              <Question title="Comparison:" ID="000064">
                                <Property propClass="numbering" propName="numbering" val="v." />
                                <CodedValue>
                                  <Code val="RID28483" />
                                  <CodeText val="comparison section" />
                                  <CodeSystem>
                                    <CodeSystemName val="RADLEX" />
                                  </CodeSystem>
                                </CodedValue>
                                <ListField>
                                  <DefaultCodeSystem>
                                    <CodeSystemName val="RADLEX" />
                                    <OID val="2.16.840.1.113883.6.256" />
                                  </DefaultCodeSystem>
                                  <List>
                                    <ListItem title="None" ID="000065" />
                                    <ListItem title="Stable Nodule" ID="000066">
                                      <CodedValue>
                                        <Code val="RID11514" />
                                        <CodeText val="stable disease" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="New Nodule" ID="000067">
                                      <CodedValue>
                                        <Code val="RID49578" />
                                        <CodeText val="new diagnosis" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="Interval increase in solid component" ID="000068">
                                      <!--Do we need to repeat RADLEX code here from Attenuation?-->
                                      <ChildItems>
                                        <Question title="Compared to:" ID="000069">
                                          <ResponseField>
                                            <Response>
                                              <date xsi:nil="true" />
                                            </Response>
                                            <TextAfterResponse val=" (date)" />
                                          </ResponseField>
                                        </Question>
                                        <Question ID="000070">
                                          <ListField>
                                            <List>
                                              <ListItem title="Solid nodule" ID="000071">
                                                <ChildItems>
                                                  <Question title="Previous mean diameter:" ID="34957">
                                                    <ResponseField>
                                                      <Response>
                                                        <positiveInteger xsi:nil="true" />
                                                      </Response>
                                                      <ResponseUnits val="mm" />
                                                    </ResponseField>
                                                  </Question>
                                                </ChildItems>
                                              </ListItem>
                                              <ListItem title="Part-solid nodule:" ID="000072">
                                                <ChildItems>
                                                  <Question title="Overall size: Previous mean diameter:" ID="3824798">
                                                    <ResponseField>
                                                      <Response>
                                                        <positiveInteger xsi:nil="true" />
                                                      </Response>
                                                      <ResponseUnits val="mm" />
                                                    </ResponseField>
                                                  </Question>
                                                  <Question title="Solid component: Previous mean diameter:" ID="23847">
                                                    <ResponseField>
                                                      <Response>
                                                        <positiveInteger xsi:nil="true" />
                                                      </Response>
                                                      <ResponseUnits val="mm" />
                                                    </ResponseField>
                                                  </Question>
                                                </ChildItems>
                                              </ListItem>
                                              <ListItem title="Pure ground glass nodule:" ID="000150">
                                                <ChildItems>
                                                  <Question title="Previous mean diameter:" ID="2384278">
                                                    <ResponseField>
                                                      <Response>
                                                        <positiveInteger xsi:nil="true" />
                                                      </Response>
                                                      <ResponseUnits val="mm" />
                                                    </ResponseField>
                                                  </Question>
                                                </ChildItems>
                                              </ListItem>
                                            </List>
                                          </ListField>
                                        </Question>
                                      </ChildItems>
                                    </ListItem>
                                    <ListItem title="Interval decreased in size" ID="000076">
                                      <ChildItems>
                                        <Question title="Compared to:" ID="347289">
                                          <ResponseField>
                                            <Response>
                                              <date xsi:nil="true" />
                                            </Response>
                                            <TextAfterResponse val=" (date)" />
                                          </ResponseField>
                                        </Question>
                                      </ChildItems>
                                    </ListItem>
                                  </List>
                                </ListField>
                              </Question>
                              <Question title="Margins:" ID="000077">
                                <Property propClass="numbering" propName="numbering" val="vi" />
                                <CodedValue>
                                  <Code val="RID5972" />
                                  <CodeText val="margin" />
                                  <CodeSystem>
                                    <CodeSystemName val="RADLEX" />
                                  </CodeSystem>
                                </CodedValue>
                                <ListField numCols="6">
                                  <DefaultCodeSystem>
                                    <CodeSystemName val="RADLEX" />
                                    <OID val="2.16.840.1.113883.6.256" />
                                  </DefaultCodeSystem>
                                  <List>
                                    <ListItem title="Spiculated" ID="000078">
                                      <CodedValue>
                                        <Code val="RID5713" />
                                        <CodeText val="spiculated margin" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="Smooth" ID="000079">
                                      <CodedValue>
                                        <Code val="RID5714" />
                                        <CodeText val="smooth margin" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="Lobulated" ID="000080">
                                      <CodedValue>
                                        <Code val="RID5711" />
                                        <CodeText val="lobulated margin" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="Polygonal" ID="000081">
                                      <CodedValue>
                                        <Code val="RID34291" />
                                        <CodeText val="polygonal" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="Halo" ID="000082">
                                      <CodedValue>
                                        <Code val="RID35260" />
                                        <CodeText val="halo sign of lung" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="Obscured" ID="000083">
                                      <CodedValue>
                                        <Code val="RID5710" />
                                        <CodeText val="obscured margin" />
                                      </CodedValue>
                                    </ListItem>
                                  </List>
                                </ListField>
                              </Question>
                              <Question title="Calcification:" ID="000084">
                                <Property propClass="numbering" propName="numbering" val="vii." />
                                <CodedValue>
                                  <Code val="RID5196" />
                                  <CodeText val="calcification" />
                                  <CodeSystem>
                                    <CodeSystemName val="RADLEX" />
                                  </CodeSystem>
                                </CodedValue>
                                <ListField numCols="3">
                                  <DefaultCodeSystem>
                                    <CodeSystemName val="RADLEX" />
                                    <OID val="2.16.840.1.113883.6.256" />
                                  </DefaultCodeSystem>
                                  <List>
                                    <ListItem title="None" ID="000085"></ListItem>
                                    <ListItem title="Benign Pattern" ID="000086">
                                      <CodedValue>
                                        <Code val="RID49675" />
                                        <CodeText val="typically benign calcification" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="Indeterminate" ID="000087">
                                      <CodedValue>
                                        <Code val="RID39110" />
                                        <CodeText val="indeterminate" />
                                      </CodedValue>
                                    </ListItem>
                                  </List>
                                </ListField>
                              </Question>
                              <Question title="Other characteristics:" ID="000088">
                                <Property propClass="numbering" propName="numbering" val="viii." />
                                <ListField numCols="4">
                                  <DefaultCodeSystem>
                                    <CodeSystemName val="RADLEX" />
                                    <OID val="2.16.840.1.113883.6.256" />
                                  </DefaultCodeSystem>
                                  <List>
                                    <ListItem title="None" ID="000089"></ListItem>
                                    <ListItem title="Fat" ID="000090">
                                      <CodedValue>
                                        <Code val="RID5878" />
                                        <CodeText val="fatty" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="Cavitation" ID="000091">
                                      <CodedValue>
                                        <Code val="RID46014" />
                                        <CodeText val="cavitated" />
                                      </CodedValue>
                                    </ListItem>
                                    <ListItem title="Other" ID="000092">
                                      <ListItemResponseField>
                                        <Response>
                                          <string val="" />
                                        </Response>
                                      </ListItemResponseField>
                                    </ListItem>
                                  </List>
                                </ListField>
                              </Question>
                              <Question title="+Other comments:" ID="000094">
                                <Property propClass="numbering" propName="numbering" val="ix." />
                                <ResponseField>
                                  <Response>
                                    <string val="" />
                                  </Response>
                                </ResponseField>
                              </Question>
                              <DisplayedItem title="If there are additional nodules, please repeat Nodule Section for nodules 2-10 " ID="000096" />
                            </ChildItems>
                          </Section>
                          <Question title="+Other comments (Including nodule &lt;4mm)" ID="000097" minCard="0">
                            <ResponseField>
                              <Response>
                                <string val="" />
                              </Response>
                            </ResponseField>
                          </Question>
                        </ChildItems>
                      </Section>
                      <Section title="Incidental Findings" ID="000098">
                        <Property type="numbering" propName="numbering" val="B." />
                        <!--RadLex code used for section actual reported actional incidental findings in impression section-->
                        <CodedValue>
                          <Code val="RID50142" />
                          <CodeText val="Incidental Finding" />
                        </CodedValue>
                        <ChildItems>
                          <Question ID="Q4.B">
                            <ListField maxSelections="0">
                              <DefaultCodeSystem>
                                <CodeSystemName val="RADLEX" />
                                <OID val="2.16.840.1.113883.6.256" />
                              </DefaultCodeSystem>
                              <List>
                                <ListItem title="Lung or Pleura:" ID="000100">
                                  <Property propClass="numbering" propName="numbering" val="1." />
                                  <CodedValue>
                                    <Code val="RID1301" />
                                    <CodeText val="Lung" />
                                  </CodedValue>
                                  <ListItemResponseField>
                                    <Response>
                                      <string val="" />
                                    </Response>
                                  </ListItemResponseField>
                                </ListItem>
                                <ListItem title="Mediastinum and Hila:" ID="000102">
                                  <Property propClass="numbering" propName="numbering" val="2." />
                                  <CodedValue>
                                    <Code val="RID1384" />
                                    <CodeText val="Mediastinum" />
                                  </CodedValue>
                                  <ListItemResponseField>
                                    <Response>
                                      <string val="" />
                                    </Response>
                                  </ListItemResponseField>
                                </ListItem>
                                <ListItem title="Chest Wall and Axilla:" ID="000104">
                                  <Property propClass="numbering" propName="numbering" val="3." />
                                  <CodedValue>
                                    <Code val="RID2468" />
                                    <CodeText val="Chest Wall" />
                                  </CodedValue>
                                  <ListItemResponseField>
                                    <Response>
                                      <string val="" />
                                    </Response>
                                  </ListItemResponseField>
                                </ListItem>
                                <ListItem title="Bones:" ID="000106">
                                  <Property propClass="numbering" propName="numbering" val="4." />
                                  <CodedValue>
                                    <Code val="RID39064" />
                                    <CodeText val="Bones" />
                                  </CodedValue>
                                  <ListItemResponseField>
                                    <Response>
                                      <string val="" />
                                    </Response>
                                  </ListItemResponseField>
                                </ListItem>
                                <ListItem title="Upper Abdomen:" ID="000108">
                                  <Property propClass="numbering" propName="numbering" val="5." />
                                  <CodedValue>
                                    <Code val="RID29990" />
                                    <CodeText val="Upper Abdomen" />
                                  </CodedValue>
                                  <ListItemResponseField>
                                    <Response>
                                      <string val="" />
                                    </Response>
                                  </ListItemResponseField>
                                </ListItem>
                                <ListItem title="+Other:" ID="000110">
                                  <Property propClass="numbering" propName="numbering" val="6." />
                                  <ChildItems>
                                    <Question ID="Q4.B.6.a">
                                      <ResponseField>
                                        <Response>
                                          <string val="" />
                                        </Response>
                                      </ResponseField>
                                    </Question>
                                  </ChildItems>
                                </ListItem>
                              </List>
                            </ListField>
                          </Question>
                        </ChildItems>
                      </Section>
                    </ChildItems>
                  </Section>
                  <Section title="IMPRESSIONS" type="level1" ID="000131">
                    <CodedValue>
                      <Code val="19005-8" />
                      <CodeText val="Impressions" />
                      <CodeSystem>
                        <CodeSystemName val="LOINC" />
                      </CodeSystem>
                    </CodedValue>
                    <ChildItems>
                      <Question title="Pulmonary nodule summary:" ID="000112">
                        <Property propClass="numbering" propName="numbering" val="1." />
                        <CodedValue>
                          <Code val="RID50238" />
                          <CodeText val="Pulmonary Nodule Impression" />
                          <CodeSystem>
                            <CodeSystemName val="RADLEX" />
                          </CodeSystem>
                        </CodedValue>
                        <ResponseField>
                          <Response>
                            <string val="" />
                          </Response>
                        </ResponseField>
                      </Question>
                      <Section title="Lung-Rads Version 1.1 Assessment Category:" type="level2" ID="000114">
                        <Property propClass="instruction" propName="worrisomenodule" val="The most worrisome nodule described above is assigned a Lung-RADS category" />
                        <CodedValue>
                          <Code val="RID50134" />
                          <CodeText val="Lung-RADS assessment" />
                        </CodedValue>
                        <ChildItems>
                          <Question title="Lung-Rads Version 1.0 Assessment Category:" ID="000115">
                            <Property type="numbering" propName="numbering" val="2." />
                            <ListField>
                              <List>
                                <ListItem title="0 - Additional lung cancer screening CT images and/or comparison to prior chest CT examinations is needed" ID="000116">
                                  <Property propClass="meta" propName="incomplete" val="Incomplete" />
                                  <Property propClass="Reporttext" propName="reporttext" val="-" />
                                  <Property propClass="Reporttext" propName="reporttextadditionalscreening" val="Additional lung cancer screening CT images and/or comparison to prior chest CT examinations is needed" />
                                  <CodedValue>
                                    <Code val="RID50135" />
                                    <CodeText val="Lung-RADS 0" />
                                  </CodedValue>
                                </ListItem>
                                <ListItem title="1 - Continue annual screening with LDCT in 12 months" ID="000117">
                                  <Property propClass="meta" propName="annualnegative" val="Negative" />
                                  <Property propClass="Reporttext" propName="noNodules" val="No nodules and definitely benign nodules" />
                                  <Property propClass="Reporttext" propName="1annualscreening12" val="Continue annual screening with LDCT in 12 months" />
                                  <CodedValue>
                                    <Code val="RID50136" />
                                    <CodeText val="Lung-RADS 1" />
                                  </CodedValue>
                                </ListItem>
                                <ListItem title="2 - Continue annual screening with LDCT in 12 months" ID="000118">
                                  <Property propClass="meta" propName="benign" val="Benign Appearance or Behavior" />
                                  <Property propClass="Reporttext" propName="low90" val="Nodules with a very low 90% likelihood of becoming a clinically active cancer due to size or lack of growth" />
                                  <Property propClass="Reporttext" propName="2annualscreening12" val="Continue annual screening with LDCT in 12 months" />
                                  <CodedValue>
                                    <Code val="RID50137" />
                                    <CodeText val="Lung-RADS 2" />
                                  </CodedValue>
                                </ListItem>
                                <ListItem title="3 - LDCT in 6 months" ID="000119">
                                  <Property propClass="meta" propName="probBenign" val="Probably Benign" />
                                  <Property propClass="Reporttext" propName="probBenignDescription" val="Probably benign finding(s) ashort term follow up suggested; includes nodules with allow likelihood of becoming a clinically active cancer" />
                                  <Property propClass="Reporttext" propName="6month" val="6 month LDCT" />
                                  <CodedValue>
                                    <Code val="RID50138" />
                                    <CodeText val="Lung-RADS 3" />
                                  </CodedValue>
                                </ListItem>
                                <ListItem title="4A - LDCT in 3 months; PET/CT may be used when there is a = 8 mm solid component" ID="000120">
                                  <Property propClass="meta" propName="supicious4A" val="Suspicious" />
                                  <Property propClass="Reporttext" propName="diagnosticTest4A" val="Findings for which additional diagnostic testing and/or tissue sampling is recommended" />
                                  <Property propClass="Reporttext" propName="3monthLDCT" val="3 month LDCT; PET/CT may be used when there is a = 8 mm solid component" />
                                  <CodedValue>
                                    <Code val="RID50139" />
                                    <CodeText val="Lung-RADS 4A" />
                                  </CodedValue>
                                </ListItem>
                                <ListItem title="4B - chest CT with or without contrast, PET/CT and/or tissue sampling depending on the *probability of malignancy and comorbidities. PET/CT may be used when there is a = 8 mm solid component" ID="000121">
                                  <Property propClass="meta" propName="supicious4B" val="Suspicious" />
                                  <Property propClass="Reporttext" propName="diagnosticTest4B" val="Findings for which additional diagnostic testing and/or tissue sampling is recommended" />
                                  <Property propClass="Reporttext" propName="ChestCT4B" val="chest CT with or without contrast, PET/CT and/or tissue sampling depending on the *probability of malignancy and comorbidities. PET/CT may be used when there is a = 8 mm solid component." />
                                  <CodedValue>
                                    <Code val="RID50140" />
                                    <CodeText val="Lung-RADS 4B" />
                                  </CodedValue>
                                </ListItem>
                                <ListItem title="4X - chest CT with or without contrast, PET/CT and/or tissue sampling depending on the *probability of malignancy and comorbidities. PET/CT may be used when there is a = 8 mm solid component" ID="000122">
                                  <Property propClass="meta" propName="suspicious4X" val="Suspicious" />
                                  <Property propClass="Reporttext" propName="diagnosticTest4X" val="Findings for which additional diagnostic testing and/or tissue sampling is recommended" />
                                  <Property propClass="Reporttext" propName="ChestCT4X" val="chest CT with or without contrast, PET/CT and/or tissue sampling depending on the *probability of malignancy and comorbidities. PET/CT may be used when there is a = 8 mm solid component." />
                                  <CodedValue>
                                    <Code val="RID50141" />
                                    <CodeText val="Lung-RADS 4X" />
                                  </CodedValue>
                                </ListItem>
                              </List>
                            </ListField>
                          </Question>
                        </ChildItems>
                      </Section>
                      <Section title="Actionable incidental Findings (S Modifier):" ID="000123">
                        <!-- section title is just for display. Do not add RADLEX code because it would repeat with 3.a. causing data integrity issues-->
                        <Property propClass="numbering" propName="numbering" val="3." />
                        <ChildItems>
                          <Question ID="pendiing" title="Actionable incidental Findings:">
                            <Property propClass="numbering" propName="numbering" val="a." />
                            <CodedValue>
                              <Code val="RID50142" />
                              <CodeText val="Incidental finding" />
                              <CodeSystem>
                                <CodeSystemName val="RADLEX" />
                              </CodeSystem>
                            </CodedValue>
                            <ListField>
                              <List>
                                <ListItem title="Yes" ID="02384098">
                                  <ChildItems>
                                    <Question ID="394570923" title="Actionable incidental Findings (reiterate incidental finding(s)):">
                                      <Property propClass="numbering" propName="numbering" val="b." />
                                      <CodedValue>
                                        <Code val="RID49482" />
                                        <CodeText val="category 3 actionable finding" />
                                        <CodeSystem>
                                          <CodeSystemName val="RADLEX" />
                                        </CodeSystem>
                                      </CodedValue>
                                      <ResponseField>
                                        <Response>
                                          <string val="" />
                                        </Response>
                                      </ResponseField>
                                    </Question>
                                    <Question ID="39759" title="Recommendation for follow-up:">
                                      <Property propClass="numbering" propName="numbering" val="c." />
                                      <CodedValue>
                                        <Code val="RID50143" />
                                        <CodeText val="Recommendation for incidental finding" />
                                        <CodeSystem>
                                          <CodeSystemName val="RADLEX" />
                                        </CodeSystem>
                                      </CodedValue>
                                      <ResponseField>
                                        <Response>
                                          <string val="" />
                                        </Response>
                                      </ResponseField>
                                    </Question>
                                  </ChildItems>
                                </ListItem>
                                <ListItem title="No" ID="59823098" />
                              </List>
                            </ListField>
                          </Question>
                        </ChildItems>
                      </Section>
                      <Question title="+Other Comments" ID="000129">
                        <Property propClass="numbering" propName="numbering" val="4." />
                        <ResponseField>
                          <Response>
                            <string val="" />
                          </Response>
                        </ResponseField>
                      </Question>
                    </ChildItems>
                  </Section>
                </ChildItems>
              </Body>
              <Footer styleClass="left" ID="Footer.1a" title="Footer">
                <!--<DisplayedItem val="+ Data elements preceded with this symbol are optional"/>-->
                <Property propName="DataElements" val="+ Data elements preceded with this symbol are optional" />
              </Footer>
            </FormDesign>
          </XMLPackage>
        </SDCPackage>
    stroke:
      summary: CT Scan for Stroke
      value: |
        <?xml version="1.0" encoding="UTF-8"?>
        <SDCPackage xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:ihe:qrph:sdc:2016" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="urn:ihe:qrph:sdc:2016 ../Schemas/RFD+SDCRetrieveForm.xsd" packageID="PKG_ACR_CT_STROKE">
            <XMLPackage>
                <FormDesign xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" ID="CT_Stroke_CCO.358_1.0.0.DRAFT_sdcFDF" baseURI="cap.org" fullURI="_baseURI=cap.org&amp;_lineage=CT_Stroke_CCO.358&amp;_version=1.0.0.DRAFT&amp;_docType=sdcFDF" formTitle="CCO Synoptic Template for  Stroke" lineage="CT_Stroke_CCO.358" filename="CT_Stroke_CCO.358_1.0.0.DRAFT_sdcFDF.xml" version="1.0.0.DRAFT" xmlns="urn:ihe:qrph:sdc:2016">
                    <Property name="Copyright" type="CAPeCC_static_text" styleClass="copyright" propName="Copyright" val="(c) 2018 College of American Pathologists.  All rights reserved.  License required for use." />
                    <Property name="GenericHeaderText" type="CAPeCC_static_text" propName="GenericHeaderText" val="CCO Radiology Synoptic Template" />
                    <Property name="Category" type="CAPeCC_meta" propName="Category" val="CNS" />
                    <Property name="OfficialName" type="CAPeCC_meta" propName="OfficialName" val="CCO Synoptic Template for  Stroke" />
                    <Property name="CAP_ProtocolName" type="CAPeCC_meta" propName="CAP_ProtocolName" />
                    <Property name="CAP_ProtocolVersion" type="CAPeCC_meta" propName="CAP_ProtocolVersion" />
                    <Property name="TemplateID" type="CAPeCC_meta" propName="TemplateID" val="358.1000043" />
                    <Property name="Restrictions" type="CAPeCC_meta" propName="Restrictions" val="This template applies to CT scans for stroke" />
                    <Property name="CAP_Required" type="CAPeCC_meta" propName="CAP_Required" val="true" />
                    <Property name="AccreditationDate" type="CAPeCC_meta dt.dateTime" propName="AccreditationDate" val="9/14/2018 12:00:00 AM" />
                    <Property name="WebPostingDate" type="CAPeCC_meta dt.dateTime" propName="WebPostingDate" val="9/14/2018 12:00:00 AM" />
                    <Property name="ShortName" type="CAPeCC_meta" propName="ShortName" val="CT_Stroke_CCO" />
                    <Property name="ApprovalStatus" type="CAPeCC_meta" propName="ReleaseStatus" val="DRAFT" />
                    <Property name="AJCC_Version" type="CAPeCC_meta" propName="AJCC_Version" val="8" />
                    <Body name="Body" ID="CT_Stroke_CCO.358_1.0.0.DRAFT_sdcFDF_Body">
                        <ChildItems name="ch_Body">
                            <Section name="S_76242" ID="76242.100004300" title="#This template describes a Common Data Element for CT Stroke by the American College of Radiologists">
                                <ChildItems name="ch_76242_1">
                                    <Question name="Q_Tum_Site_76234" ID="76234.100004300" readOnly="true">
                                        <ListField name="lf_76234_1">
                                            <List name="lst_76234_2">
                                                <ListItem name="LI_Adrenal_Gland_76235" ID="76235.100004300" title="Adrenocortical neoplasm" selected="true" />
                                            </List>
                                        </ListField>
                                    </Question>
                                </ChildItems>
                            </Section>
                            <Section name="S_76221" ID="76221.100004300" title="Administrative &amp; Identification Data">
                                <ChildItems name="ch_76221_1">
                                    <Question name="Q_76219" ID="76219.100004300" title="Report Date">
                                        <ResponseField name="rf_76219_1">
                                            <Response name="rsp_76219_2">
                                                <string name="str_76219_3" />
                                            </Response>
                                        </ResponseField>
                                    </Question>
                                    <Question name="Q_76413" ID="76413.100004300" title="Report completed by ">
                                        <ResponseField name="rf_76413_1">
                                            <Response name="rsp_76413_2">
                                                <string name="str_76413_3" />
                                            </Response>
                                        </ResponseField>
                                    </Question>
                                    <Question name="Q_76325" ID="76325.100004300" title="Procedure">
                                        <ListField name="lf_76325_1">
                                            <List name="lst_76325_2">
                                                <ListItem name="LI_NS_76240" ID="76240.100004300" title="LDCT " />
                                                <ListItem name="LI_Oth_76239" ID="76239.100004300" title="Other (specify)">
                                                    <ListItemResponseField name="lirf_76239_1" responseRequired="true">
                                                        <Response name="rsp_76239_2">
                                                            <string name="str_76239_3" />
                                                        </Response>
                                                    </ListItemResponseField>
                                                </ListItem>
                                            </List>
                                        </ListField>
                                    </Question>
                                </ChildItems>
                            </Section>
                            <Section name="S_77659" ID="77659.100004300" title="Findings">
                                <ChildItems name="ch_77659_4">
                                    <Question name="Q_77913" ID="77913.100004300" title="Hyperacute signs">
                                        <ListField name="lf_77913_1">
                                            <List name="lst_77913_2">
                                                <ListItem name="LI_77914" ID="77914.100004300" title="Yes" />
                                                <ListItem name="LI_77915" ID="77915.100004300" title="No" />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77916" ID="77916.100004300" title="Location">
                                        <ListField name="lf_77916_1" maxSelections="0">
                                            <List name="lst_77916_2">
                                                <ListItem name="LI_77918" ID="77918.100004300" title="Right frontal" />
                                                <ListItem name="LI_77917" ID="77917.100004300" title="Temporal" />
                                                <ListItem name="LI_77919" ID="77919.100004300" title="parietal" />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77920" ID="77920.100004300" title="Vascular Territory">
                                        <ListField name="lf_77920_1">
                                            <List name="lst_77920_2">
                                                <ListItem name="LI_77921" ID="77921.100004300" title="ACA" />
                                                <ListItem name="LI_77922" ID="77922.100004300" title="MCA" />
                                                <ListItem name="LI_77923" ID="77923.100004300" title="PCA" />
                                                <ListItem name="LI_77924" ID="77924.100004300" title="SCA" />
                                                <ListItem name="LI_77925" ID="77925.100004300" title="AICA" />
                                                <ListItem name="LI_77926" ID="77926.100004300" title="PICA" />
                                                <ListItem name="LI_77927" ID="77927.100004300" title="Basil perforator" />
                                                <ListItem name="LI_77928" ID="77928.100004300" title="Thalamoperforator " />
                                                <ListItem name="LI_77929" ID="77929.100004300" title="AntChoroidal " />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77930" ID="77930.100004300" title="Hemorrhagic conversion">
                                        <ListField name="lf_77930_1">
                                            <List name="lst_77930_2">
                                                <ListItem name="LI_77931" ID="77931.100004300" title="Yes" />
                                                <ListItem name="LI_77932" ID="77932.100004300" title="No" />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77933" ID="77933.100004300" title="Mass effect">
                                        <ListField name="lf_77933_1">
                                            <List name="lst_77933_2">
                                                <ListItem name="LI_77934" ID="77934.100004300" title="Yes" />
                                                <ListItem name="LI_77935" ID="77935.100004300" title="No" />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77936" ID="77936.100004300" title="Vascular Mechanism/Pattern">
                                        <ListField name="lf_77936_1">
                                            <List name="lst_77936_2">
                                                <ListItem name="LI_77937" ID="77937.100004300" title="embolic" />
                                                <ListItem name="LI_77938" ID="77938.100004300" title="perforator" />
                                                <ListItem name="LI_77939" ID="77939.100004300" title=" borderzone ischemia" />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77940" ID="77940.100004300" title="Midlineshift in mm">
                                        <ResponseField name="rf_77940_1">
                                            <Response name="rsp_77940_2">
                                                <string name="str_77940_3" />
                                            </Response>
                                        </ResponseField>
                                    </Question>
                                    <Question name="Q_77941" ID="77941.100004300" title="Herniation">
                                        <ListField name="lf_77941_1">
                                            <List name="lst_77941_2">
                                                <ListItem name="LI_77942" ID="77942.100004300" title="No" />
                                                <ListItem name="LI_77943" ID="77943.100004300" title="Subfalcine " />
                                                <ListItem name="LI_77944" ID="77944.100004300" title="Transtentorial " />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77945" ID="77945.100004300" title="Hyperdense vessel?">
                                        <ListField name="lf_77945_1">
                                            <List name="lst_77945_2">
                                                <ListItem name="LI_77946" ID="77946.100004300" title="Yes" />
                                                <ListItem name="LI_77947" ID="77947.100004300" title="No" />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77948" ID="77948.100004300" title="Hyperdense Sign">
                                        <ListField name="lf_77948_1">
                                            <List name="lst_77948_2">
                                                <ListItem name="LI_77949" ID="77949.100004300" title="Middle cerebral" />
                                                <ListItem name="LI_77950" ID="77950.100004300" title="Anteriorcerebral " />
                                                <ListItem name="LI_77951" ID="77951.100004300" title="Intrasylvian cortical" />
                                                <ListItem name="LI_77952" ID="77952.100004300" title="Basilar artery " />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77953" ID="77953.100004300" title="Arterial calcification ">
                                        <ListField name="lf_77953_1">
                                            <List name="lst_77953_2">
                                                <ListItem name="LI_77958" ID="77958.100004300" title="Yes" />
                                                <ListItem name="LI_77959" ID="77959.100004300" title="No" />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77954" ID="77954.100004300" title="Venous thrombus">
                                        <ListField name="lf_77954_1">
                                            <List name="lst_77954_2">
                                                <ListItem name="LI_77960" ID="77960.100004300" title="Yes" />
                                                <ListItem name="LI_77961" ID="77961.100004300" title="No" />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77955" ID="77955.100004300" title="Sinus location">
                                        <ListField name="lf_77955_1">
                                            <List name="lst_77955_2">
                                                <ListItem name="LI_77962" ID="77962.100004300" title="Dural venous sinus " />
                                                <ListItem name="LI_77963" ID="77963.100004300" title="Cortical vein" />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77956" ID="77956.100004300" title="Hydrocephalus">
                                        <ListField name="lf_77956_1">
                                            <List name="lst_77956_2">
                                                <ListItem name="LI_77964" ID="77964.100004300" title="No" />
                                                <ListItem name="LI_77965" ID="77965.100004300" title="Yes" />
                                            </List>
                                        </ListField>
                                    </Question>
                                    <Question name="Q_77957" ID="77957.100004300" title="ASPECTS classification">
                                        <ResponseField name="rf_77957_1">
                                            <Response name="rsp_77957_2">
                                                <string name="str_77957_3" />
                                            </Response>
                                        </ResponseField>
                                    </Question>
                                </ChildItems>
                            </Section>
                            <Question name="Q_Comments_76386" ID="76386.100004300" title="Comment(s)">
                                <ResponseField name="rf_76386_1">
                                    <Response name="rsp_76386_2">
                                        <string name="str_76386_3" />
                                    </Response>
                                </ResponseField>
                            </Question>
                        </ChildItems>
                    </Body>
                    <Footer name="footer" ID="Footer.CT_Stroke_CCO.358_1.0.0.DRAFT_sdcFDF">
                        <Property type="meta" styleClass="copyright" propName="CopyrightFooter" val="(c) 2018 College of American Pathologists.  All rights reserved.  License required for use." />
                    </Footer>
                </FormDesign>
            </XMLPackage>
        </SDCPackage>`;
