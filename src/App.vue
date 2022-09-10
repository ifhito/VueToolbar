<script setup lang="ts">
  import { text } from '@fortawesome/fontawesome-svg-core';
  import { reactive, ref, toRaw, watch } from 'vue'
  import Button from './components/Atoms/Button.vue';
  import ToolTipsGroup from './components/Molecules/ToolTipsGroup.vue';
  import ToolBar from './components/Organisms/ToolBar.vue';
  import "./lib.d.ts";
  import { tooltipsGroupType, areaPropaties } from './lib';
  defineProps<{ msg: string }>()
  
  const count = ref(0)
  const func = ref(()=>{alert("click")})
  const select = ref()
  const selectText = ref<string | undefined>('')
  const alertText = ref('')
  const selected = ref(()=> {
    select.value = window.getSelection()
    selectText.value = window.getSelection()?.toString()
  })

  const disableFunc = async () => {
    const text = await navigator.clipboard.readText()
    if(selectText.value === '') {
      const templist = tooltipsListOfCCP.value.map((item)=>{
        if(item.iconName === "paste" && text !== '') return item
        item.areaPropaties.disabled = true
        return item 
      })
      tooltipsListOfCCP.value = templist
    }else{
      const templist = tooltipsListOfCCP.value.map((item)=>{
        if(item.iconName === "paste" && text === '') return item
        item.areaPropaties.disabled = false
        return item 
      })
      tooltipsListOfCCP.value = templist
    }
  }
  watch(selectText, disableFunc, {immediate: true})
  
  // TODO: SELECTした文字全てを置き換えてしまうものの修正
  // DONE: spanでboldした後の続きの文章は普通の文字にしたい。
  const changeStyleFunc = (style:string) => {
    if(!select.value?.rangeCount) return;
    const range = select.value.getRangeAt(0);
    const newNode = document.createElement('span');
    newNode.setAttribute('style', style);
    // 文字の周りにspanを追加
    range.surroundContents(newNode)
    //続きの文章が太文字にならないようにCaret位置を変更する
    const textarea = document.getElementById("textarea-sent") as Node;
    // 空白を最後の子要素に入れる
    const txt = document.createTextNode("\u00a0");
    textarea?.appendChild(txt);
    textarea?.focus()
    const r = document.createRange()
    r.setStart(textarea, textarea?.childNodes.length);
    r.setEnd(textarea, textarea?.childNodes.length);
    select.value.removeAllRanges();
    select.value.addRange(r);
  }
  
  // DONE:クリップボードへのペースト
  const CPCFunc = async (event) => {
    switch(event){
      case "scissors":
        if (navigator.clipboard && !select.value.toString() == false) {
          await navigator.clipboard.writeText(select.value.toString());
          alertText.value = `${selectText.value}をカットしました`
          select.value.deleteFromDocument();
          disableFunc()
        } else {
          alert("clipboardAPIに対応していません");
        }
        break;
      case "copy":
        if (navigator.clipboard && !select.value.toString() == false) {
          await navigator.clipboard.writeText(select.value.toString());
          alertText.value = `${selectText.value}をコピーしました`
          disableFunc()
        } else {
          alert("clipboardAPIに対応していません");
        }
        break
      case "paste":
        if (navigator.clipboard) {
          const target = document.getElementById("textarea-sent");
          const text = await navigator.clipboard.readText()
          if (!select.value || !select.value.rangeCount) throw new Error("何かおかしい");
          select.value.deleteFromDocument();
          select.value.getRangeAt(0).insertNode(document.createTextNode(text));
          alertText.value = `${text}をペーストしました`
        } else {
          alert("clipboardAPIに対応していません");
        }
    }
  }
  const tooltipsListOfFixStyle = ref([
    {
      iconName: "bold",
      tabindex: 0,
      tooltipText: "太文字にする",
      onClick: ()=>{changeStyleFunc("font-weight: bold;"); alertText.value = `${selectText.value}を太文字にしました`},
      areaPropaties: {
        pressed: false,
        disabled: null
      }
    },
    {
      iconName: "palette",
      tabindex: -1,
      tooltipText: "色を青に変更する",
      onClick: ()=>{changeStyleFunc("color: blue;"); alertText.value = `${selectText.value}を青色にしました`},
      areaPropaties: {
        pressed: false,
        disabled: null
      }
    }
  ])
  const tooltipsListOfCCP = ref([
    {
      iconName: "copy",
      tabindex: -1,
      tooltipText: "コピーする",
      onClick: (disabled:boolean|null)=> disabled ? null : CPCFunc("copy"),
      areaPropaties: {
        pressed: null,
        disabled: true
      }
    },
    {
      iconName: "scissors",
      tabindex: -1,
      tooltipText: "カットする",
      onClick: (disabled:boolean|null)=> disabled ? null : CPCFunc("scissors"),
      areaPropaties: {
        pressed: null,
        disabled: true
      }
    },
    {
      iconName: "paste",
      tabindex: -1,
      tooltipText: "ペーストする",
      onClick: (disabled:boolean|null)=> disabled ? null : CPCFunc("paste"),
      areaPropaties: {
        pressed: null,
        disabled: false
      }
    }
  ])
  const toolBarList = ref([
    {
      GroupName: "FixStyle",
      tooltipsGroupList: tooltipsListOfFixStyle.value
    },
    {
      GroupName: "CopyAndPasteAndCut",
      tooltipsGroupList: tooltipsListOfCCP.value
    }
  ])

  const changeTool = (event) => {
    const elements = document.getElementsByClassName('tooltip')
    const index = [].findIndex.call(elements, e => e === event.target)
    switch(event.key){
      case "ArrowLeft":
        // 矢印キーが押されたら、フォーカスとtabindexを変更する。
        if(!elements[index - 1]) return
        changeTabindex(index, - 1);
        elements[index - 1].focus()
        changeTabindex(index - 1, 0);
        break;
      case "ArrowRight":
        if(!elements[index + 1]) return
        changeTabindex(index, -1);
        elements[index + 1].focus()
        changeTabindex(index + 1, 0);
        break;
      case "Home":
        changeTabindex(index, -1)
        elements[0].focus()
        changeTabindex(0, 0)
        break;
      case "End":
        changeTabindex(index, -1)
        elements[elements.length - 1].focus()
        changeTabindex(elements.length - 1, 0)
        break;
    }
  }
  // tabindexを変更する関数。
  const changeTabindex = (index:number, tabindex:number) => {
    let indexTmp = index;
    for(let tool of toolBarList.value){
      if(indexTmp < tool.tooltipsGroupList.length){ 
        let tooltmp = tool.tooltipsGroupList[indexTmp]
        tooltmp.tabindex = tabindex
        tool.tooltipsGroupList.splice(indexTmp, 1, tooltmp);
        return
      }
      indexTmp -= tool.tooltipsGroupList.length;
    }
  }
  </script>
  
  <template>
    <label class="toolbar-label" for="textarea-sent">RICH TEXTBOXS</label>
    <ToolBar @keydown="changeTool" :tool-bar-list="toolBarList"/>
    <div
    role="textarea"
    @select="selected"
    @blur="selected"
    @keyup="selected"
    @click="selected"
    name="sentence"
    id="textarea-sent"
    cols="30"
    rows="10"
    contenteditable="true"
    aria-multiline="true"
    area-labeledby="richtextbox"
    >
    </div>
    <span role="alert" aria-live="assertive" class="alert">{{alertText}}</span>
  </template>
  
  <style scoped>
    #textarea-sent {
      width: 600px;
      height: 400px;
      text-align: left;
      padding: 1rem;
      background-color: aquamarine;
      border-radius: 10px;
      color: black;
      box-shadow: 1px 1px 7px 0px rgb(15 0 0 / 60%);
    }
    .toolbar-label {
      color:chocolate;
    }
    .alert {
      opacity: 0;
    }
  </style>
  