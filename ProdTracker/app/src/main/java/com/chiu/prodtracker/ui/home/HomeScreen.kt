package com.chiu.prodtracker.ui.home


import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.chiu.prodtracker.ui.theme.ProdTrackerTheme


@Composable
fun HomeScreen(
    modifier: Modifier
) {
    
}

@Composable
fun HomeBody(
    menuList: List<String>,
    onItemClick: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
    ) {
        MenuList(
            menuList = menuList,
            onItemClick = {},
            modifier = Modifier.padding(horizontal = 20.dp)
        )
    }
}

@Composable
fun MenuList(menuList: List<String>, onItemClick: (String) -> Unit, modifier: Modifier = Modifier) {
    LazyColumn(modifier = modifier) {
        items(items = menuList, key = {it}) { item -> 
            MenuItem(
                itemName = item,
                modifier = Modifier
                    .padding(5.dp)
                    .clickable { }
            )
        }
    }
}

@Composable
fun MenuItem(itemName: String, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(10.dp),
            horizontalArrangement = Arrangement.Center
        ) {
            Text(text = itemName)
        }
    }
}

@Preview(showBackground = true)
@Composable
fun HomeBodyPreview() {
    HomeBody(menuList = listOf("Start Work", "Lunch", "End Work", "Employees", "Batches","Employee Activity Tracker"), onItemClick = {})
}

@Preview(showBackground = true)
@Composable
fun MenuListPreview() {
    ProdTrackerTheme {
        MenuList(menuList = listOf("Start Work", "Lunch", "End Work", "Employee Activity Tracker") ,onItemClick = {} , modifier = Modifier)
    }
}