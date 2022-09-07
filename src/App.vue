<script setup lang="ts">
  import { text } from '@fortawesome/fontawesome-svg-core';
  import { reactive, ref, toRaw, watch } from 'vue'
  import Button from './components/Atoms/Button.vue';
  import ToolTipsGroup from './components/Molecules/ToolTipsGroup.vue';
  import ToolBar from './components/Organisms/ToolBar.vue';
  import "./lib.d.ts";
import { tooltipsGroupType } from './lib';
  defineProps<{ msg: string }>()
  
  const count = ref(0)
  const func = ref(()=>{alert("click")})
  const select = ref()
  const selected = ref(()=> {select.value = window.getSelection()})
  
  // DONE: spanでboldした後の続きの文章は普通の文字にしたい。
  const changeStyleFunc = (style:string) => {
    console.log(select.value)
    if(!select.value?.rangeCount) return;
    const range = select.value.getRangeAt(0);
    const newNode = document.createElement('span');
    newNode.setAttribute('style', style);
    // 文字の周りにspanを追加
    range.surroundContents(newNode)
    //続きの文章が太文字にならないようにCaret位置を変更する
    const textarea = document.getElementById("textarea-sent");
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
      case "cut":
        if (navigator.clipboard && !select.value.toString() == false) {
          await navigator.clipboard.writeText(select.value.toString());
          select.value.deleteFromDocument();
        } else {
          alert("clipboardAPIに対応していません");
        }
        break;
      case "copy":
        if (navigator.clipboard && !select.value.toString() == false) {
          await navigator.clipboard.writeText(select.value.toString());
        } else {
          alert("clipboardAPIに対応していません");
        }
        break
      case "paste":
        if (navigator.clipboard) {
          const target = document.getElementById("textarea-sent");
          await navigator.clipboard.readText().then((text)=>{
            if (!select.value || !select.value.rangeCount) throw new Error("何かおかしい");
            select.value.deleteFromDocument();
            select.value.getRangeAt(0).insertNode(document.createTextNode(text));
          });
        } else {
          alert("clipboardAPIに対応していません");
        }
    }
  }
  const tooltipsListOfFixStyle = [
    {
      iconName: "bold",
      tabindex: 0,
      tooltipText: "太文字にする",
      onClick: ()=>changeStyleFunc("font-weight: bold;")
    },
    {
      iconName: "palette",
      tabindex: -1,
      tooltipText: "色を青に変更する",
      onClick: ()=>changeStyleFunc("color: blue;")
    }
  ]
  const tooltipsListOfCCP = [
    {
      iconName: "copy",
      tabindex: -1,
      tooltipText: "コピーする",
      onClick: ()=>CPCFunc("copy")
    },
    {
      iconName: "scissors",
      tabindex: -1,
      tooltipText: "カットする",
      onClick: ()=>CPCFunc("cut")
    },
    {
      iconName: "paste",
      tabindex: -1,
      tooltipText: "ペーストする",
      onClick: ()=>CPCFunc("paste")
    }
  ]
  const toolBarList = reactive([
    {
      GroupName: "FixStyle",
      tooltipsGroupList: tooltipsListOfFixStyle
    },
    {
      GroupName: "CopyAndPasteAndCut",
      tooltipsGroupList: tooltipsListOfCCP
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
    }
  }
  // tabindexを変更する関数。
  const changeTabindex = (index, tabindex) => {
    let indexTmp = index;
    for(let tool of toolBarList){
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
    <label for="textarea-sent">RICH TEXTBOXS</label>
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
  </template>
  
  <style scoped>
    #textarea-sent {
      color:chocolate;
      width: 600px;
      height: 400px;
      text-align: left;
      padding: 1rem;
      background-color: aquamarine;
      border-radius: 10px;
      color: black;
    }
  </style>
  